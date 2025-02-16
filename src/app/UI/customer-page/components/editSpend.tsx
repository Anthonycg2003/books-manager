"use client";

import { useState } from "react";

interface Spend {
  amount: number;
  day: number;
  month: string;
  year: number;
  type: string;
}

interface SpendBookPageProps {
  month: string;
  spends: Spend[];
  onEditSpend: (spendData: Spend, spendPosition: number) => void;
  onDeleteSpend: (spendPosition: number) => void;
}

export function EditSpendBookPage({
  month,
  spends,
  onEditSpend,
  onDeleteSpend,
}: SpendBookPageProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Spend | null>(null);

  const handleEditClick = (spend: Spend, index: number) => {
    setEditingIndex(index);
    setEditForm({ ...spend });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;

    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]:
        name === "amount" || name === "day" || name === "year"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    if (!editForm) return;

    onEditSpend(editForm, index);
    setEditingIndex(null);
    setEditForm(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gastos del mes: {month}</h2>

      <div className="space-y-4">
        {spends.map((spend, index) => (
          <div key={index} className="border p-4 rounded-lg shadow">
            {editingIndex === index ? (
              <form
                onSubmit={(e) => handleSubmit(e, index)}
                className="space-y-2"
              >
                <div>
                  <label className="block text-sm">Monto:</label>
                  <input
                    type="number"
                    name="amount"
                    value={editForm?.amount}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Día:</label>
                  <input
                    type="number"
                    name="day"
                    value={editForm?.day}
                    onChange={handleInputChange}
                    min={1}
                    max={31}
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Tipo:</label>
                  <input
                    type="text"
                    name="type"
                    value={editForm?.type}
                    onChange={handleInputChange}
                    className="border rounded p-1 w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingIndex(null);
                      setEditForm(null);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p>
                  <span className="font-bold">Monto:</span> Bs. {spend.amount}
                </p>
                <p>
                  <span className="font-bold">Fecha:</span> {spend.day}/
                  {spend.month}/{spend.year}
                </p>
                <p>
                  <span className="font-bold">Tipo:</span> {spend.type}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditClick(spend, index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDeleteSpend(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
