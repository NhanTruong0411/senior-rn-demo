/**
 * Navigation param types — defines which screens exist and what params they accept.
 *
 * Even with 1 screen per stack, typing from the start means:
 *   - TypeScript catches wrong screen names at compile time.
 *   - Adding screens later is safe (no untyped gaps).
 *
 * `undefined` = the screen takes no params.
 */

export type AuthStackParamList = {
  Login: undefined;
};

export type AppStackParamList = {
  Home: undefined;
};
