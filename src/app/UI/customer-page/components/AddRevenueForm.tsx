import { addRevenue } from "@/app/utils/db/dbHandler";
import { validateRevenue } from "@/app/utils/validations/revenue";
import { useParams } from "next/navigation";
import { FormEvent, RefObject, useState } from "react";

export function AddRevenueForm(props: {
  addRevenueModal: RefObject<HTMLDialogElement | null>;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const params = useParams();
  const customerNIT = params.customer as string;

  async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const day = data.get("day");
    const month = data.get("month");
    const year = data.get("year");
    const amount = data.get("amount");
    const isValid = validateRevenue(Number(day), Number(year), Number(amount));
    if (isValid === true) {
      const revenue = await addRevenue(customerNIT, {
        amount: Number(amount),
        day: Number(day),
        month: month as string,
        year: Number(year),
        details: data.get("details") as string,
      });
      setErrors([revenue]);
    } else {
      setErrors(isValid);
    }
  }

  return (
    <form className="flex flex-col gap-5 items-center" onSubmit={handlerSubmit}>
      <label>
        Monto{" "}
        <input
          name="amount"
          type="text"
          className="border-black border-2 rounded px-1 w-20"
        />
      </label>
      <label>
        Dia{" "}
        <input
          name="day"
          type="text"
          className="border-black border-2 rounded px-1 w-20"
        />
      </label>
      <label>
        Mes
        <select
          name="month"
          id=""
          className="border-black border-2 rounded px-1  ml-3"
        >
          <option>Enero</option>
          <option>Febrero</option>
          <option>Marzo</option>
          <option>Abril</option>
          <option>Mayo</option>
          <option>Junio</option>
          <option>Julio</option>
          <option>Agosto</option>
          <option>Septiembre</option>
          <option>Octubre</option>
          <option>Noviembre</option>
          <option>Diciembre</option>
        </select>
      </label>
      <label>
        Año{" "}
        <input
          name="year"
          type="text"
          defaultValue={2024}
          className="border-black border-2 rounded px-1 w-20"
        />
      </label>
      <label>
        Detalles{" "}
        <input
          name="details"
          type="text"
          className="border-black border-2 rounded px-1 w-20"
        />
      </label>
      <ul>
        {errors.map((error) => {
          return <li className="text-red-500">{error}</li>;
        })}
      </ul>
      <button
        type="submit"
        className="bg-green-300 rounded text-white p-1 text-center hover:bg-green-400 w-fit h-fit"
      >
        Agregar ingreso
      </button>
      <button
        onClick={() => {
          props.addRevenueModal.current?.close();
          setErrors([]);
        }}
        type="reset"
        className="bg-red-300 rounded text-white p-1 text-center hover:bg-red-400 w-fit h-fit"
      >
        Cancelar
      </button>
    </form>
  );
}
