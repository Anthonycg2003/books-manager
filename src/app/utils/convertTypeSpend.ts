export function convertTypeSpend(type: string) {
  switch (type) {
    case "Materias primas y materiales":
      return "mat";
    case "Mercancias para la venta":
      return "merc";
    case "Combustible":
      return "comb";
    case "Energia electrica":
      return "elec";
    case "Remuneraciones al personal contratado":
      return "trab_cont";
    case "Agua":
      return "agua";
    case "Telefono":
      return "tel";
    case "Nauta hogar":
      return "nauta";
    case "Otros":
      return "otros";
    default:
      return "";
  }
}
