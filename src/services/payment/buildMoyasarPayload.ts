export interface MoyasarPaymentPayload {
  amount: number;
  description: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nationalId: string;
  createdBy: string;
}

export function buildMoyasarPaymentPayload({
  amountSar,
  description,
  mobileNumber,
  nationalId,
  firstName,
  lastName,
  createdBy,
}: {
  amountSar: number;
  description: string;
  mobileNumber: string;
  nationalId: string;
  firstName: string;
  lastName: string;
  createdBy: string;
}): MoyasarPaymentPayload {
  return {
    amount: amountSar,
    description,
    firstName,
    lastName,
    mobileNumber,
    nationalId,
    createdBy,
  };
}
