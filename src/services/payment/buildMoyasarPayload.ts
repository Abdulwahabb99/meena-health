export interface MoyasarPaymentPayload {
  amount: number;
  description: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nationalId: string;
  mail: string;
  createdBy: string;
}

export function buildMoyasarPaymentPayload({
  amountSar,
  description,
  mobileNumber,
  nationalId,
  firstName,
  lastName,
  mail,
  createdBy,
}: {
  amountSar: number;
  description: string;
  mobileNumber: string;
  nationalId: string;
  firstName: string;
  lastName: string;
  mail: string;
  createdBy: string;
}): MoyasarPaymentPayload {
  return {
    amount: amountSar,
    description,
    firstName,
    lastName,
    mobileNumber,
    nationalId,
    mail,
    createdBy,
  };
}
