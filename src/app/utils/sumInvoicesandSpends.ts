export function sumInvoices(invoices: { amount: number }[]) {
  console.log(invoices);
  return invoices.reduce((acc, curr) => acc + curr.amount, 0);
}
export function sumSpends(spends: { [key: string]: number | string }) {
  let sum = 0;
  for (const key in spends) {
    if (typeof spends[key] === "number") {
      sum += spends[key];
    }
  }
  if (sum === 0) return "";
  return sum;
}
export function sumSpendsByType(
  spends: {
    amount: number;
    day: number;
    month: string;
    year: number;
    type: string;
  }[],
  type: string | null
) {
  let sum = 0;
  for (const spend of spends) {
    if (spend.type === type || type === null) {
      sum += spend.amount;
    }
  }
  return sum;
}
