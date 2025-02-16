import { number, z } from "zod";

function validateYear(year: any) {
  const model = z.number().min(2020).max(2030);
  const result = model.safeParse(year);
  return result.success;
}
function validateDay(day: any) {
  const model = z.number().max(31).min(1);
  const result = model.safeParse(day);
  return result.success;
}
function validateAmount(amount: any) {
  const model = z.number().positive();
  const result = model.safeParse(amount);
  return result.success;
}

export function validateRevenue(day: number, year: number, amount: number) {
  const errors = [];
  if (!validateDay(day)) errors.push("El dia debe ser un numero entre 1 y 31");
  if (!validateYear(year)) errors.push("El ano debe ser valido");
  if (!validateAmount(amount))
    errors.push("El monto debe ser un numero positivo");
  if (errors.length === 0) return true;
  return errors;
}
export function addRevenueToDB(
  day: string,
  month: string,
  year: string,
  amount: string,
  NIT: string
) {
  const customer = customersDB.find((cust) => cust.NIT.toString() === NIT);
}
