import React, { useRef } from "react";
import { AddRevenueForm } from "./components/AddRevenueForm";
import { AddSpendForm } from "./components/AddSpendForm";
import { CustomerActions } from "./components/CustomerActions";

export function RenderActions() {
  const addRevenueModal = useRef<HTMLDialogElement>(null);
  const addSpendModal = useRef<HTMLDialogElement>(null);
  return (
    <>
      <CustomerActions
        setAddRevenue={addRevenueModal}
        setAddSpend={addSpendModal}
      />
      <dialog ref={addRevenueModal} className="rounded p-20">
        <AddRevenueForm addRevenueModal={addRevenueModal} />
      </dialog>
      <dialog ref={addSpendModal} className="rounded p-20">
        <AddSpendForm addSpendModal={addSpendModal} />
      </dialog>
    </>
  );
}
