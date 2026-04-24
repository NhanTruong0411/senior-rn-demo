/**
 * authBridge.ts — bridge between non-React code (API client) and AuthProvider.
 *
 * Problem: client.ts is plain TypeScript. It cannot call useAuth() (hooks only work in components).
 * Solution: AuthProvider registers its logout function here on mount.
 *           client.ts calls the registered function on 401.
 *
 * This is a simple module-level singleton — fine for auth, which has only one provider per app.
 */

type LogoutFn = () => Promise<void>;

let registeredLogout: LogoutFn | null = null;

/** Called by AuthProvider on mount to expose its logout function. */
export function registerLogoutHandler(fn: LogoutFn): void {
  registeredLogout = fn;
}

/** Called by client.ts when server returns 401. Safe to call even if no handler is registered. */
export async function triggerLogout(): Promise<void> {
  if (registeredLogout) {
    await registeredLogout();
  }
}
