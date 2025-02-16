import { sumInvoices } from "@/app/utils/sumInvoicesandSpends";
import "../../globals.css";
import { useId } from "react";

export function RevenueBookPage(props: {
  month: string;
  revenues: {
    amount: number;
    day: number;
    month: string;
    year: number;
    details: string;
  }[];
}) {
  const amountRevenues = props.revenues.length;
  return (
    <table>
      <BookHeader month={props.month} />
      {props.revenues.map((revenue) => {
        return (
          <BookRow
            day={revenue.day.toString()}
            revenue={revenue.amount.toString()}
            details={revenue.details}
          />
        );
      })}
      {Array(31 - amountRevenues).fill(<BookRow />)}
      <tr>
        <td>
          <strong>Total</strong>
        </td>
        <td>{sumInvoices(props.revenues)}</td>
        <td></td>
        <td>{sumInvoices(props.revenues)}</td>
        <td>{sumInvoices(props.revenues)}</td>
        <td className="block-date"></td>
      </tr>
    </table>
  );
}
function BookRow({ day = "", revenue = "", details = "" }) {
  const id = useId();
  return (
    <tr key={id}>
      <td>{day}</td>
      <td> {revenue}</td>
      <td></td>
      <td>{revenue}</td>
      <td>{revenue}</td>
      <td>{details}</td>
    </tr>
  );
}
function BookHeader(props: { month: string }) {
  return (
    <>
      <tr>
        <th
          colSpan={2}
          className="no-p"
          style={{ textAlign: "start", paddingLeft: "5px" }}
        >
          {props.month}
        </th>
        <th colSpan={4} className="no-p">
          REGISTRO DE LAS OPERACIONES DE INGRESOS
        </th>
      </tr>
      <tr>
        <th rowSpan={3}>Día</th>
        <th className="no-p" style={{ fontSize: "0.8em" }}>
          DÉBITOS
        </th>
        <th colSpan={3} className="no-p" style={{ fontSize: "0.8em" }}>
          CREDITOS
        </th>

        <th rowSpan={3} colSpan={2} style={{ width: "30%" }}>
          DETALLE
        </th>
      </tr>
      <tr>
        <th className="sub-header" rowSpan={2}>
          EFECTIVO EN CAJA
        </th>
        <th colSpan={2} className="no-p" style={{ fontSize: "0.8em" }}>
          SUBCUENTAS DE INGRESOS
        </th>
        <th rowSpan={2}>TOTAL INGRESOS</th>
      </tr>
      <tr>
        <th className="sub-header" style={{ fontSize: "0.7em" }}>
          NO CONSIDERADOS A EFECTOS DE IMPUESTOS
        </th>
        <th className="sub-header">INGRESOS OBTENIDOS</th>
      </tr>
      <tr>
        <td>(1)</td>
        <td>(2)</td>
        <td>(3)</td>
        <td>(4)</td>
        <td>(5)</td>
        <td>(6)</td>
      </tr>
    </>
  );
}
