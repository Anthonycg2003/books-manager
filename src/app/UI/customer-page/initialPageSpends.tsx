"use client";

export function InitialPageSpends(props: {
  name: string;
  nit: string;
  address: string;
  municipality: string;
  province: string;
  activity: string;
  obligations: { name: string; paragraph: string }[];
}) {
  return (
    <>
      <table className="table">
        <tr>
          <td className="header" colSpan={3}>
            REGISTRO DE LAS OPERACIONES DE GASTOS
            <br />
            PARA EL TRABAJO POR CUENTA PROPIA
          </td>
          <td style={{ width: "20%" }}>Año: 2024</td>
        </tr>
        <tr>
          <td colSpan={3}>
            Nombre(s) y Apellidos del Contribuyente: {props.name}
          </td>
          <td>NIT: {props.nit}</td>
        </tr>
        <tr>
          <td colSpan={4}>
            Domicilio fiscal: (lugar donde desarrolla la actividad): calle, No,
            apto, entre calles: {props.address}
          </td>
        </tr>
        <tr>
          <td colSpan={2}>Municipio: {props.municipality}</td>
          <td colSpan={2}>Provincia: {props.province}</td>
        </tr>
        <tr>
          <td colSpan={4}>
            Domicilio legal: (según Carnet de Identidad): calle, No, Apto, entre
            calles: {props.address}
          </td>
        </tr>
        <tr>
          <td colSpan={2}>Municipio: {props.municipality}</td>
          <td colSpan={2}>Provincia: {props.province} </td>
        </tr>
        <tr>
          <td colSpan={3}>Actividad: {props.activity}</td>
          <td>Código:</td>
        </tr>
      </table>

      <table className="table">
        <tr>
          <td className="yellow-header" colSpan={2}>
            OBLIGACIONES
          </td>
        </tr>
        <tr>
          <td style={{ width: "70%" }}>Nombre del tributo</td>
          <td>Párrafo</td>
        </tr>
        {props.obligations.map((obligation) => (
          <Obligation name={obligation.name} paragraph={obligation.paragraph} />
        ))}
        {Array(7 - props.obligations.length).fill(<Obligation />)}
      </table>

      <table>
        <tr>
          <td className="yellow-header" colSpan={2}>
            ACREDITACIÓN DEL REGISTRO
          </td>
        </tr>
        <tr>
          <td colSpan={2}>Municipio:</td>
        </tr>
        <tr>
          <td style={{ width: "70%" }}>Nombre del funcionario</td>
          <td>Firma</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div>
          <table style={{ width: "auto" }}>
            <tr>
              <td style={{ width: "40px" }}>D</td>
              <td style={{ width: "40px" }}>M</td>
              <td style={{ width: "40px" }}>A</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </div>
        <div className="onat-box">Para uso de la ONAT</div>
      </div>
    </>
  );
}
function Obligation({ name = "", paragraph = "" }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{paragraph}</td>
    </tr>
  );
}
