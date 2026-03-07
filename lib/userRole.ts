export type UserRole = "agency" | "participant" | "admin";

const KEY = "userRole";

export const setUserRole = (role: UserRole) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, role);
  }
};

export const getUserRole = (): UserRole => {
  if (typeof window === "undefined") return "agency";
  return (localStorage.getItem(KEY) as UserRole) ?? "agency";
};

export const clearUserRole = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(KEY);
  }
};
