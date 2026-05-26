const AUTH_KEY = "nahue_coach_admin_session";
const isClient = typeof window !== "undefined";

export interface AdminUser {
  email: string;
  name: string;
}

export function loginAdmin(email: string, pass: string): AdminUser | null {
  if (!isClient) return null;

  if (email === "admin@test.com" && pass === "admin123") {
    const user: AdminUser = {
      email: "admin@test.com",
      name: "Administrador Nahuel Coach"
    };
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function logoutAdmin(): void {
  if (!isClient) return;
  window.localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  if (!isClient) return false;
  try {
    const session = window.localStorage.getItem(AUTH_KEY);
    return !!session;
  } catch (error) {
    return false;
  }
}

export function getAuthenticatedUser(): AdminUser | null {
  if (!isClient) return null;
  try {
    const session = window.localStorage.getItem(AUTH_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    return null;
  }
}
