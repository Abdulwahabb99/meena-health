import API from "shared/functions/axios";

export interface ApiAuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: number;
}

export interface LoginResponseData {
  token: string;
  user: ApiAuthUser;
}

export interface AuthEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export async function loginUserApi(body: {
  email: string;
  password: string;
}): Promise<LoginResponseData> {
  const { data } = await API.post<AuthEnvelope<LoginResponseData>>(
    "/Auth/login",
    body,
  );
  if (!data?.success || !data.data?.token || !data.data?.user) {
    throw new Error(data?.message || "Login failed");
  }
  return data.data;
}

export async function registerUserApi(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<void> {
  const { data } = await API.post<AuthEnvelope<unknown>>(
    "/Auth/register",
    body,
  );
  if (!data?.success) {
    throw new Error(data?.message || "Registration failed");
  }
}
