export function formatInrCroreLakh(amountInr: number): string {
  if (amountInr >= 10000000) {
    const cr = amountInr / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  }
  if (amountInr >= 100000) {
    const lakhs = amountInr / 100000;
    return `₹${lakhs.toFixed(2)} Lakhs`;
  }
  return `₹${amountInr.toLocaleString("en-IN")}`;
}
