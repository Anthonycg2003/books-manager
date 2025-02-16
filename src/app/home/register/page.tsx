"use client";

import { addClient } from "@/app/utils/db/dbHandler";
import { FormEvent, useRef, useState } from "react";
import { number } from "zod";
const activities = [
  "Arrendador de habitaciones",
  "Venta de materiales de contruccion",
  "Servicios de belleza",
];
const provinces = ["La habana"];
const municipalities = [
  "Plaza",
  "Centro Habana",
  "Playa",
  "San Miguel del Padron",
  "Guanabacoa",
  "Cotorro",
  "Habana del Este",
];
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
const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export default function Register() {
  const resultMessage = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState<any>("");
  function handlerSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const NIT = data.get("NIT") as string;
    const phone = data.get("phone") as string;
    const activity = data.get("activity") as string;
    const direction = data.get("direction") as string;
    const municipality = data.get("municipality") as string;
    const province = data.get("province") as string;
    const workerSalary = data.get("workerSalary") as string;
    const SocialSecurity = data.get("SocialSecurity") as string;
    const RC05 = data.get("RC05") as string;
    const hasCar = Boolean(data.get("hasCar"));
    const hasCartel = Boolean(data.get("hasCartel"));
    const obligations = [...commonObligations];
    const spends: any[] = [];
    if (Number(workerSalary) > 0) {
      obligations.push({
        name: "Impuestos s/ ingresos personales - retencion TCP",
        paragraph: "0520522",
      });
      obligations.push({
        name: "Impuestos por utilizacion de fuerza de trabajo (PN)",
        paragraph: "0610322",
      });
      months.forEach((month) => {
        spends.push({
          day: 1,
          month: month,
          year: 2024,
          amount: Number(workerSalary),
          type: "Remuneraciones al personal contratado",
        });
      });
    }
    if (Number(SocialSecurity) > 0) {
      obligations.push({
        name: "Contribucion especial a la seguridad social",
        paragraph: "0820132",
      });
    }
    if (hasCar) {
      obligations.push({
        name: "Impuesto s/ el transporte terrestre",
        paragraph: "0710622",
      });
    }
    if (hasCartel) {
      obligations.push({
        name: "Tasa por radicacion de anuncios y propaganda comercial",
        paragraph: "0900122",
      });
    }
    setMessage(
      addClient({
        name: name,
        NIT: NIT,
        phone: phone,
        activity: activity,
        direction: direction,
        municipality: municipality,
        province: province,
        RC05: RC05,
        obligations: obligations,
        spends: spends,
        revenues: [],
      })
    );
    resultMessage.current?.showModal();
  }
  return (
    <>
      <form
        action="register"
        className="flex flex-col gap-5 items-left p-10"
        onSubmit={handlerSubmit}
      >
        <label>
          Nombre
          <input
            name="name"
            type="text"
            className="border-black border-2 rounded px-1 w-88"
          />
        </label>
        <label>
          NIT{" "}
          <input
            name="NIT"
            type="text"
            className="border-black border-2 rounded px-1 w-40"
          />
        </label>
        <label>
          Actividad
          <select
            name="activity"
            id=""
            className="border-black border-2 rounded px-1  ml-3"
          >
            {activities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </label>
        <label>
          Direccion{" "}
          <input
            name="direction"
            type="text"
            className="border-black border-2 rounded px-1 w-40"
          />
        </label>
        <label>
          Provincia{" "}
          <select
            name="province"
            className="border-black border-2 rounded px-1 w-40"
          >
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </label>
        <label>
          Municipio{" "}
          <select
            name="municipality"
            className="border-black border-2 rounded px-1 w-40"
          >
            {municipalities.map((municipality) => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
          </select>
        </label>
        <label>
          RC05{" "}
          <input
            name="RC05"
            type="text"
            className="border-black border-2 rounded px-1 w-40"
          />
        </label>
        <label>
          Telefono{" "}
          <input
            name="phone"
            type="text"
            className="border-black border-2 rounded px-1 w-40"
          />
        </label>
        <label>
          Salario trabajador{" "}
          <input
            name="workerSalary"
            type="text"
            className="border-black border-2 rounded px-1 w-20"
          />
        </label>
        <label>
          Seguridad social{" "}
          <input
            name="SocialSecurity"
            type="text"
            className="border-black border-2 rounded px-1 w-20"
          />
        </label>
        <label>
          Tiene carro{" "}
          <input
            name="hasCar"
            type="checkbox"
            className="border-black border-2 rounded px-1 w-20"
          />
        </label>
        <label>
          Tiene cartel{" "}
          <input
            name="hasCartel"
            type="checkbox"
            className="border-black border-2 rounded px-1 w-20"
          />
        </label>
        <button
          type="submit"
          className="bg-green-300 rounded text-white p-1 text-center hover:bg-green-400 w-fit h-fit"
        >
          Registrar
        </button>
        <button
          type="reset"
          className="bg-red-300 rounded text-white p-1 text-center hover:bg-red-400 w-fit h-fit"
        >
          Cancelar
        </button>
      </form>
      <dialog
        ref={resultMessage}
        className={`rounded p-20 ${
          message === "NIT ya existente" ? "bg-red-100" : "bg-green-100"
        }`}
      >
        <h1
          className={
            message === "NIT ya existente" ? "text-red-600" : "text-green-600"
          }
        >
          {message}
        </h1>
        <button
          onClick={() => resultMessage.current?.close()}
          className="mt-4 bg-gray-200 rounded px-4 py-2 hover:bg-gray-300"
        >
          Cerrar
        </button>
      </dialog>
    </>
  );
}
