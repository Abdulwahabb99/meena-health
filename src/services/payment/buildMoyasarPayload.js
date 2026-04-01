/** Amount in SAR (riyals), max 2 decimal places — not halalas. */
function amountInRiyals(totalPrice) {
  const n = Number(totalPrice);
  if (Number.isNaN(n) || n < 0) return 0;
  return Math.round(n * 100) / 100;
}

export function buildMoyasarPaymentPayload({
  medications = [],
  totalPrice = 0,
  customerDetails = {},
}) {
  const description =
    medications.length === 0
      ? ""
      : medications.map((m) => m.name).filter(Boolean).join(", ");

  return {
    amount: amountInRiyals(totalPrice),
    description,
    PhoneNumber: customerDetails.phone ?? "",
    nationalId: customerDetails.idNumber ?? "",
    FirstName: customerDetails.firstName ?? "",
    LastName: customerDetails.lastName ?? "",
  };
}
