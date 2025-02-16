"use client";
import Image from "next/image";
import "../../styles/vf.css";
import { useState } from "react";
import { defineObligations } from "@/app/utils/obligations";

export default function VF(props: {
  NIT: string;
  name: string;
  municipality: string;
  RC05: string;
  obligations: [];
}) {
  const [taxes, setTaxes] = useState(
    defineObligations(
      props.obligations.map((obligation) => obligation.paragraph)
    )
  );

  return (
    <div className="container">
      <div className="horizontal-flex">
        <div className="header-container">
          <div className="header-title">
            RC-04A Vector fiscal de persona natural
          </div>
          <div className="flex-container">
            <div className="item-width">NIT: {props.NIT}</div>
            <div className="item-width">Carné de identidad: {props.NIT}</div>
          </div>

          <p>Nombre y apellidos: {props.name}</p>
          <p>DPA-Municipio: 2302-{props.municipality}</p>
          <p>Código de barras del RC-05 (DPA, NIT): {props.RC05}</p>
        </div>
        <div className="vertical-flex">
          <Image
            className="float-right"
            src={"/onat.png"}
            alt="onat image"
            width={100}
            height={100}
          />
          <p className="float-right">Año: 2025</p>
        </div>
      </div>
      <table className="table">
        <caption className="table-caption">
          Obligaciones tributarias en CUP (pesos cubanos)
        </caption>
        <thead>
          <tr>
            <th className="table-header">Pagado</th>
            <th className="table-header">Código barras</th>
            <th className="table-header">Importe</th>
            <th className="table-header">Código tributo</th>
            <th className="table-header">Período: Fecha límite de pago</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((obligation) => (
            <VFRow
              key={obligation.code}
              code={obligation.code}
              tributo={obligation.tribute}
              fecha={obligation.month + ": " + obligation.date}
              value={determineValue(obligation.tribute)}
            />
          ))}
        </tbody>
      </table>
      Actividades(1) <br />
      * I-Actividades de alojamiento y de serv. de comida
      <br />
      Tributos({props.obligations.length})
      <br />
      {props.obligations.map((obligation) => (
        <RenderTribute tributo={obligation.paragraph} name={obligation.name} />
      ))}
    </div>
  );
}
function VFRow(props: {
  code: string;
  tributo: string;
  fecha: string;
  value: string;
}) {
  return (
    <tr>
      <td>
        <div className="checkbox"></div>
      </td>
      <td className="code">{props.code}</td>
      <td className="value">{props.value}</td>
      <td>{props.tributo}</td>
      <td className="fecha">{props.fecha}</td>
    </tr>
  );
}
function RenderTribute(props: { tributo: string; name: string }) {
  return (
    <>
      * {props.tributo}-{props.name}
      <br />
    </>
  );
}
function determineValue(tribute: string) {
  switch (tribute) {
    case "0820132":
      return "1200.00";
    case "0710622":
      return "52.00";
    default:
      return "";
  }
}
