/**
 * Static until user/profile integration sends the real creator from the backend.
 */
export const MOYASAR_PAYMENT_CREATED_BY = "Yazeed Admin";

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
}: {
  amountSar: number;
  description: string;
  mobileNumber: string;
  nationalId: string;
  firstName: string;
  lastName: string;
}): MoyasarPaymentPayload {
  return {
    amount: amountSar,
    description,
    firstName,
    lastName,
    mobileNumber,
    nationalId,
    createdBy: MOYASAR_PAYMENT_CREATED_BY,
  };
}
