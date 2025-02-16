"use client";

import { EditSpendBookPage } from "@/app/UI/customer-page/components/editSpend";
import { findClient, editSpend, deleteSpend } from "@/app/utils/db/dbHandler";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const customerNit = params.customer as string;
  const month = params.month as string;
  const [monthSpends, setMonthSpends] = useState<any>(null);
  const [spendIndexes, setSpendIndexes] = useState<number[]>([]);

  function getSpends() {
    const loadCustomer = async () => {
      const customerObj = await findClient(customerNit);
      const filteredSpends = customerObj.spends.filter(
        (spend) => spend.month.toLowerCase() === month
      );
      // Guardar los índices originales de los gastos filtrados
      const indexes = customerObj.spends.reduce(
        (acc: number[], spend, index) => {
          if (spend.month.toLowerCase() === month) {
            acc.push(index);
          }
          return acc;
        },
        []
      );
      setSpendIndexes(indexes);
      setMonthSpends(filteredSpends);
    };
    loadCustomer();
  }

  const handleEditSpend = async (spendData: any, spendPosition: number) => {
    const originalIndex = spendIndexes[spendPosition];
    const result = await editSpend(customerNit, originalIndex, spendData);
    if (result === "Gasto actualizado con éxito") {
      getSpends(); // Recargar los gastos después de la edición
    }
  };
  const handleDeleteSpend = async (index: number) => {
    const originalIndex = spendIndexes[index];
    const resultado = await deleteSpend(customerNit, originalIndex);
    if (resultado === "Gasto eliminado con éxito") {
      getSpends(); // Actualizar el estado o recargar los datos
    }
  };

  // Y luego en el JSX:

  useEffect(() => {
    getSpends();
  }, []);

  if (monthSpends)
    return (
      <EditSpendBookPage
        month={month}
        spends={monthSpends}
        onEditSpend={handleEditSpend}
        onDeleteSpend={handleDeleteSpend}
      />
    );
}
