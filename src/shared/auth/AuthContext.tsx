/**
 * AuthContext.tsx — Auth state machine for the entire app.
 *
 * Provides:
 *   - AuthProvider: wraps the app, manages auth state.
 *   - useAuth(): hook for any component to read auth state + call login/logout.
 *
 * State machine (4 states):
 *   idle → (check SecureStore) → authenticated | unauthenticated
 *   unauthenticated → (login) → loading → authenticated
 *   authenticated → (logout / 401) → unauthenticated
 *
 * Not included (Day 5 scope):
 *   - Refresh token flow
 *   - Role-based access
 *   - Biometric re-auth
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { registerLogoutHandler } from "./authBridge";
import { clearTokens, getAccessToken, saveTokens } from "./tokenStorage";

/**
 * Log auth state transitions to Reactotron (dev only).
 * No-op in production — Reactotron is only loaded when __DEV__ is true.
 */
function logAuth(message: string) {
  if (__DEV__) {
    console.log(`[Auth] ${message}`);
  }
}

// ----- Types -----

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// ----- Context -----

const AuthContext = createContext<AuthContextValue | null>(null);

/** Simulate network delay for mock login (ms). */
const MOCK_LOGIN_DELAY = 1000;

/**
 * AuthProvider — wrap the app with this to provide auth state everywhere.
 *
 * On mount: checks SecureStore for existing token.
 *   - Token found → "authenticated" (user stays logged in).
 *   - No token → "unauthenticated" (show login screen).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("idle");

  useEffect(() => {
    /** Check SecureStore on app start. Runs once. */
    async function restoreToken() {
      const token = await getAccessToken();
      logAuth(token ? "restore → authenticated" : "restore → unauthenticated");
      setStatus(token ? "authenticated" : "unauthenticated");
    }
    restoreToken();
  }, []);

  /**
   * Mock login: simulate API call, save fake tokens, update state.
   * Validation (empty email, etc.) happens in LoginScreen — not here.
   */
  const login = useCallback(async (_email: string, _password: string) => {
    logAuth("login → loading");
    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, MOCK_LOGIN_DELAY));

    const mockAccessToken = `mock-access-${Date.now()}`;
    const mockRefreshToken = `mock-refresh-${Date.now()}`;

    await saveTokens(mockAccessToken, mockRefreshToken);
    logAuth("login → authenticated");
    setStatus("authenticated");
  }, []);

  /** Clear tokens from SecureStore and reset state to unauthenticated. */
  const logout = useCallback(async () => {
    logAuth("logout → unauthenticated");
    await clearTokens();
    setStatus("unauthenticated");
  }, []);

  useEffect(() => {
    registerLogoutHandler(logout);
  }, [logout]);

  const value = useMemo(() => ({ status, login, logout }), [status, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — hook to access auth state and actions from any component.
 * Must be used inside AuthProvider. Throws if used outside.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return context;
}

export type { AuthStatus, AuthContextValue };
