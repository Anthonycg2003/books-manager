"use client";

import { RevenueBookPage } from "@/app/UI/customer-page/revenue-book-page";
import { SpendBookPage } from "@/app/UI/customer-page/spend-book-page";
import { findClient } from "@/app/utils/db/dbHandler";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const customerNit = params.customer as string;
  const month = params.month as string;
  const [monthSpends, setMonthSpends] = useState<any>(null);
  function getSpends() {
    const loadCustomer = async () => {
      const customerObj = await findClient(customerNit);
      setMonthSpends(
        customerObj.spends
          .filter((spend) => spend.month.toLowerCase() === month)
          .sort((a, b) => a.day - b.day)
      );
    };
    loadCustomer();
  }
  useEffect(() => {
    getSpends();
  }, []);
  if (monthSpends) return <SpendBookPage month={month} spends={monthSpends} />;
}
