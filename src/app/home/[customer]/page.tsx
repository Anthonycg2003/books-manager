"use client";

import { useParams } from "next/navigation";
import { RenderActions } from "@/app/UI/customer-page/actions";
import { findClient, getClients, updateClient } from "@/app/utils/db/dbHandler";
import { useEffect, useState } from "react";
import { sumInvoices } from "@/app/utils/sumInvoicesandSpends";

export default function Page() {
  const params = useParams();
  const customerNIT = params.customer as string;
  const [customerObj, setCustomerObj] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    NIT: '',
    activity: '',
    direction: '',
    phone: '',
    socialSecurity: '',
    hasCar: false,
    hasSign: false,
    salary: ''
  });

  const commonObligations = [
    {
      name: "Impuesto s/ ventas y servicios (PN)",
      paragraph: "0114022",
    },
    {
      name: "Impuestos s/ ingresos personales - aporte mensual",
      paragraph: "0510122",
    },
    {
      name: "Impuesto s/ ingresos personales (liquid. adicional)",
      paragraph: "0530222",
    },
  ];

  useEffect(() => {
    const loadCustomer = async () => {
      const customerObj = await findClient(customerNIT);
      setCustomerObj(customerObj);
    };
    loadCustomer();
  }, []);

  useEffect(() => {
    if (customerObj) {
      setFormData({
        name: customerObj.name,
        NIT: customerObj.NIT,
        activity: customerObj.activity,
        direction: customerObj.direction,
        phone: customerObj.phone,
        socialSecurity: customerObj.socialSecurity || '',
        hasCar: customerObj.hasCar || false,
        hasSign: customerObj.hasSign || false,
        salary: customerObj.salary || ''
      });
    }
  }, [customerObj]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const obligations = [...commonObligations];
    const spends: any[] = [];

    if (Number(formData.salary) > 0) {
      obligations.push({
        name: "Impuestos s/ ingresos personales - retencion TCP",
        paragraph: "0520522",
      });
      obligations.push({
        name: "Impuestos por utilizacion de fuerza de trabajo (PN)",
        paragraph: "0610322",
      });
    }

    if (Number(formData.socialSecurity) > 0) {
      obligations.push({
        name: "Contribucion especial a la seguridad social",
        paragraph: "0820132",
      });
    }

    if (formData.hasCar) {
      obligations.push({
        name: "Impuesto s/ el transporte terrestre",
        paragraph: "0710622",
      });
    }

    if (formData.hasSign) {
      obligations.push({
        name: "Tasa por radicacion de anuncios y propaganda comercial",
        paragraph: "0900122",
      });
    }

    const updatedCustomer = {
      ...customerObj,
      ...formData,
      obligations: obligations,
    };

    const success = await updateClient(updatedCustomer);
    if (success) {
      setCustomerObj(updatedCustomer);
      setIsEditing(false);
    } else {
      alert('Error al guardar los cambios');
    }
  };

  if (!customerObj) return <h1>Un error ocurrio</h1>;
  return (
    <>
      <h2 className="text-center text-5xl p-5">
        {"Nombre: " + customerObj.name}
      </h2>
      <div className="flex h-screen">
        <div className="flex flex-col p-10 gap-3">
          {!isEditing ? (
            <>
              <h5>{"NIT: " + customerObj.NIT}</h5>
              <h5>{"Actividad: " + customerObj.activity.toString()}</h5>
              <h5>{"Direccion: " + customerObj.direction}</h5>
              <h5>{"Telefono: " + customerObj.phone}</h5>
              <h5>{"Seguridad Social: " + (customerObj.socialSecurity || 'No especificado')}</h5>
              <h5>{"Tiene Carro: " + (customerObj.hasCar ? 'Sí' : 'No')}</h5>
              <h5>{"Tiene Cartel: " + (customerObj.hasSign ? 'Sí' : 'No')}</h5>
              <h5>{"Salario: " + (customerObj.salary || 'No especificado')}</h5>
              <h5>{"Ingresos: " + sumInvoices(customerObj.revenues)}</h5>
              <h5>{"Gastos: " + sumInvoices(customerObj.spends)}</h5>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar Información
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Nombre"
              />
              <input
                type="text"
                name="NIT"
                value={formData.NIT}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="NIT"
              />
              <input
                type="text"
                name="activity"
                value={formData.activity}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Actividad"
              />
              <input
                type="text"
                name="direction"
                value={formData.direction}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Dirección"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Teléfono"
              />
              <input
                type="text"
                name="socialSecurity"
                value={formData.socialSecurity}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Seguridad Social"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasCar"
                  checked={formData.hasCar}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
                <label>Tiene Carro</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasSign"
                  checked={formData.hasSign}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
                <label>Tiene Cartel</label>
              </div>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Salario"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
        <RenderActions />
      </div>
    </>
  );
}
