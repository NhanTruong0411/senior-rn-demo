/**
 * ReactotronConfig.ts — dev-only debug tool.
 *
 * Loaded only when __DEV__ === true (see index.ts).
 * Never runs in production builds.
 *
 * What Reactotron gives us:
 *   - Live log of all fetch() calls (URL, headers, body, status, timing).
 *   - Custom logs via tron.log() / tron.display() — useful for auth state transitions.
 *   - Console.log forwarded to the desktop app.
 *
 * Setup: open the Reactotron desktop app, then start Metro.
 */

import Reactotron from "reactotron-react-native";

Reactotron.configure({ name: "senior-rn-demo" })
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .connect();

export default Reactotron;
