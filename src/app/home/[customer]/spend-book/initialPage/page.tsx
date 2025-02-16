"use client";

import { InitialPageSpends } from "@/app/UI/customer-page/initialPageSpends";
import { findClient } from "@/app/utils/db/dbHandler";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const customerNit = params.customer as string;
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  function getInfo() {
    const loadCustomer = async () => {
      const customerObj = await findClient(customerNit);
      setCustomerInfo(customerObj);
    };
    loadCustomer();
  }
  useEffect(() => {
    getInfo();
  }, []);
  if (customerInfo)
    return (
      <InitialPageSpends
        name={customerInfo.name as string}
        nit={customerInfo.NIT as string}
        address={customerInfo.direction as string}
        municipality={customerInfo.municipality as string}
        province={customerInfo.province as string}
        activity={customerInfo.activity as string}
        obligations={
          customerInfo.obligations as { name: string; paragraph: string }[]
        }
      />
    );
}
