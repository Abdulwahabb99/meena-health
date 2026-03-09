import { useAuth } from "./useAuth";

export const useHasPermission = (key) => {
  const {
    user: { permissions },
  } = useAuth();

  const hasPermission = permissions?.some((permission) => permission === key);
  return hasPermission;
};
