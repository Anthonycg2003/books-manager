import { addRevenue, addSpend } from "@/app/utils/db/dbHandler";
import { validateRevenue } from "@/app/utils/validations/revenue";
import { useParams } from "next/navigation";
import { FormEvent, RefObject, useState } from "react";

const spendTypes = [
  "Materias primas y materiales",
  "Mercancias para la venta",
  "Combustible",
  "Energia electrica",
  "Remuneraciones al personal contratado",
  "Agua",
  "Telefono",
  "Nauta hogar",
  "Otros",
];
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function AddSpendForm(props: {
  addSpendModal: RefObject<HTMLDialogElement | null>;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const params = useParams();
  const customerNIT = params.customer as string;

  async function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const day = data.get("day");
    const month = data.get("month");
    const year = data.get("year");
    const amount = data.get("amount");
    const type = data.get("type");
    const isValid = validateRevenue(Number(day), Number(year), Number(amount));
    if (isValid === true) {
      const spend = await addSpend(customerNIT, {
        amount: Number(amount),
        day: Number(day),
        month: month as string,
        year: Number(year),
        type: data.get("type") as string,
      });

      if (typeof spend === "string" && spend.includes("error")) {
        setErrors([spend]);
      } else {
        setSuccessMessage("¡Gasto agregado exitosamente!");
        setErrors([]);
        setTimeout(() => {
          setSuccessMessage("");
          console.log("a");
        }, 2000);
      }
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
          {months.map((month) => {
            return <option>{month}</option>;
          })}
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
        Tipo
        <select
          name="type"
          id=""
          className="border-black border-2 rounded px-1  ml-3"
        >
          {spendTypes.map((type) => {
            return <option>{type}</option>;
          })}
        </select>
      </label>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {successMessage}
        </div>
      )}
      <ul>
        {errors.map((error) => {
          return (
            <li className="text-red-500" key={error}>
              {error}
            </li>
          );
        })}
      </ul>
      <button
        type="submit"
        className="bg-green-300 rounded text-white p-1 text-center hover:bg-green-400 w-fit h-fit"
      >
        Agregar gasto
      </button>
      <button
        onClick={() => {
          props.addSpendModal.current?.close();
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
