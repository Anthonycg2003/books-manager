import Link from "next/link";
import { usePathname } from "next/navigation";
import { RefObject } from "react";

export function CustomerActions(props: {
  setAddRevenue: RefObject<HTMLDialogElement | null>;
  setAddSpend: RefObject<HTMLDialogElement | null>;
}) {
  return (
    <div className="flex-col place-items-center">
      <div className="grid grid-cols-2 w-fit h-fit gap-9 p-16">
        <Link
          className="bg-green-300 rounded text-white w-3/4 p-1 text-center hover:bg-green-400"
          href={usePathname() + "/" + "revenue-book"}
        >
          Obtener libro de ingresos
        </Link>
        <Link
          className="bg-rose-300 rounded text-white w-3/4 p-1 text-center hover:bg-rose-400"
          href={usePathname() + "/" + "spend-book"}
        >
          Obtener libro de gastos
        </Link>
        <button
          className="bg-green-300 rounded text-white w-3/4 p-1 text-center hover:bg-green-400"
          onClick={() => {
            props.setAddRevenue.current?.showModal();
          }}
        >
          Agregar ingreso
        </button>
        <button
          className="bg-rose-300 rounded text-white w-3/4 p-1 text-center hover:bg-rose-400"
          onClick={() => {
            props.setAddSpend.current?.showModal();
          }}
        >
          Agregar gasto
        </button>
        <Link
          className="bg-green-300 rounded text-white w-3/4 p-1 text-center hover:bg-green-400"
          href={usePathname() + "/" + "revenue-book"}
        >
          Editar ingresos ingresos
        </Link>
        <Link
          className="bg-rose-300 rounded text-white w-3/4 p-1 text-center hover:bg-rose-400"
          href={usePathname() + "/" + "edit-spend-book"}
        >
          Editar gastos
        </Link>
      </div>
      <Link
        className="bg-orange-200 rounded text-white w-3/4 p-1 text-center hover:bg-orange-400 "
        href={usePathname() + "/" + "VF"}
      >
        Obtener Vector Fiscal
      </Link>
    </div>
  );
}
