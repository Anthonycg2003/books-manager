"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getClients } from "../utils/db/dbHandler";
import { useEffect, useState } from "react";

export default function Home() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const loadCustomers = async () => {
      const clients = await getClients();
      setCustomers(clients);
    };

    loadCustomers();
  }, []);

  return (
    <>
      <Link
        className="bg-blue-500 rounded text-white w-auto p-1 text-center hover:bg-green-400 fixed top-5 right-5"
        href={usePathname() + "/" + "register"}
      >
        Registrar nuevo cliente
      </Link>
      <div className="grid grid-cols-3 gap-3 m-5">
        <RenderCustomers customers={customers} />
      </div>
    </>
  );
}
function RenderCustomers(props: { customers: any }) {
  return props.customers.map((customer) => {
    return (
      <div
        className="flex flex-col gap-5 items-center border-2 rounded p-3"
        key={customer.NIT}
      >
        <h3 className="font-bold">{customer.name}</h3>
        <Link
          href={usePathname() + "/" + customer.NIT}
          className="bg-blue-500 rounded text-white w-3/4 p-1 text-center"
        >
          Ver Informacion
        </Link>
      </div>
    );
  });
}
