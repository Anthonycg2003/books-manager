import { sumSpends, sumSpendsByType } from "@/app/utils/sumInvoicesandSpends";
import "../../globals.css";
import { useId } from "react";
import { convertTypeSpend } from "@/app/utils/convertTypeSpend";

export function SpendBookPage(props: {
  month: string;
  spends: {
    amount: number;
    day: number;
    month: string;
    year: number;
    type: string;
  }[];
}) {
  const amountSpends = props.spends.length;
  return (
    <div className="spend-book-container">
      <table>
        <BookHeader month={props.month} />
        {props.spends.map((spend) => {
          const spendObj = {
            mat: 0,
            merc: 0,
            comb: 0,
            elec: 0,
            trab_cont: 0,
            agua: 0,
            tel: 0,
            nauta: 0,
            otros: 0,
          };
          spendObj[convertTypeSpend(spend.type)] = spend.amount;
          return <BookRow day={spend.day.toString()} spend={spendObj} />;
        })}
        {Array(31 - amountSpends).fill(<BookRow />)}
        <tr>
          <th>Total</th>
          <td>
            {sumSpendsByType(props.spends, "Materias primas y materiales")}
          </td>
          <td>{sumSpendsByType(props.spends, "Mercancias para la venta")}</td>
          <td>{sumSpendsByType(props.spends, "Combustible")}</td>
          <td>{sumSpendsByType(props.spends, "Energia electrica")}</td>
          <td>
            {sumSpendsByType(
              props.spends,
              "Remuneraciones al personal contratado"
            )}
          </td>
          <td>{sumSpendsByType(props.spends, "Agua")}</td>
          <td>{sumSpendsByType(props.spends, "Telefono")}</td>
          <td>{sumSpendsByType(props.spends, "Nauta hogar")}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            {sumSpendsByType(props.spends, "Otros gastos necesarios y menores")}
          </td>
          <td>{sumSpendsByType(props.spends, null)}</td>
        </tr>
      </table>
    </div>
  );
}
function BookRow({
  day = "",
  spend = {
    mat: "",
    merc: "",
    comb: "",
    elec: "",
    trab_cont: "",
    agua: "",
    tel: "",
    nauta: "",
    otros: "",
  },
}) {
  const id = useId();
  return (
    <tr key={id}>
      <td>{day}</td>
      <td>{spend.mat}</td>
      <td>{spend.merc}</td>
      <td>{spend.comb}</td>
      <td>{spend.elec}</td>
      <td>{spend.trab_cont}</td>
      <td>{spend.agua}</td>
      <td>{spend.tel}</td>
      <td>{spend.nauta}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{spend.otros}</td>
      <td>{sumSpends(spend)}</td>
    </tr>
  );
}
function BookHeader(props: { month: string }) {
  return (
    <>
      <tr>
        <th colSpan={2} className="main-header">
          {props.month.toUpperCase()}
        </th>
        <th colSpan={12} className="main-header">
          GASTOS DE OPERACIÓN
        </th>
      </tr>
      <tr>
        <th colSpan={13} className="subheader">
          SUBCUENTAS
        </th>
        <th rowSpan={4}>
          TOTAL GASTOS
          <br />
          AUTORIZADOS
          <br />
          POSIBLES A<br />
          DEDUCIR
          <br />
          (14)
        </th>
      </tr>
      <tr>
        <th colSpan={13} className="subheader">
          POSIBLES A DEDUCIR DENTRO DE LOS LÍMITES DE GASTOS AUTORIZADOS
        </th>
      </tr>
      <tr>
        <th rowSpan={2}>Día</th>
        <th rowSpan={2}>
          Materias
          <br />
          primas
          <br />
          materiales
        </th>
        <th rowSpan={2}>
          Mercancías
          <br />
          para la
          <br />
          venta
        </th>
        <th rowSpan={2} style={{ width: "fit-content" }}>
          Combustible
        </th>
        <th rowSpan={2}>
          Energía
          <br />
          eléctrica
        </th>
        <th rowSpan={2}>
          Remuneraciones
          <br />
          al personal
          <br />
          contratado
        </th>
        <th rowSpan={2}>Agua</th>
        <th rowSpan={2}>Telefono</th>
        <th rowSpan={2}>
          Nauta <br />
          hogar
        </th>
        <th rowSpan={2}></th>
        <th rowSpan={2}></th>
        <th rowSpan={2}></th>
        <th rowSpan={2}>
          Otros gastos
          <br />
          necesarios y<br />
          menores
          <br />
          (13)
        </th>
      </tr>
      <tr></tr>
      <tr>
        <td>(1)</td>
        <td>(2)</td>
        <td>(3)</td>
        <td>(4)</td>
        <td>(5)</td>
        <td>(6)</td>
        <td>(7)</td>
        <td>(8)</td>
        <td>(9)</td>
        <td>(10)</td>
        <td>(11)</td>
        <td>(12)</td>
        <td>(13)</td>
        <td>(14)</td>
      </tr>
    </>
  );
}
