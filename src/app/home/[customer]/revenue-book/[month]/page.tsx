"use client";

import { RevenueBookPage } from "@/app/UI/customer-page/revenue-book-page";
import { findClient } from "@/app/utils/db/dbHandler";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const customerNit = params.customer as string;
  const month = params.month as string;
  const [monthRevenues, setMonthRevenues] = useState<any>(null);
  function getRevenues() {
    const loadCustomer = async () => {
      const customerObj = await findClient(customerNit);
      setMonthRevenues(
        customerObj.revenues.filter(
          (revenue) => revenue.month.toLowerCase() === month
        )
      );
    };
    loadCustomer();
  }
  useEffect(() => {
    getRevenues();
  }, []);
  if (monthRevenues)
    return <RevenueBookPage month={month} revenues={monthRevenues} />;
}
