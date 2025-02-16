"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Page() {
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

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <Link
        key={"initialPage"}
        className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        href={usePathname() + "/initialPage"}
      >
        {"Pagina Inicial"}
      </Link>
      {months.map((month, index) => (
        <Link
          key={month}
          className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          href={usePathname() + "/" + month}
        >
          {month}
        </Link>
      ))}
    </div>
  );
}
