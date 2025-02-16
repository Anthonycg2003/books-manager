"use client";
import VF from "@/app/UI/customer-page/VFPage";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { findClient } from "@/app/utils/db/dbHandler";

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
      <VF
        name={customerInfo.name as string}
        NIT={customerInfo.NIT as string}
        municipality={customerInfo.municipality as string}
        RC05={(" " + customerInfo.RC05) as string}
        obligations={customerInfo.obligations as []}
      />
    );
}
