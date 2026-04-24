import { registerRootComponent } from "expo";

import { AppRoot } from "./src/app";

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- must stay a require() so Reactotron is only pulled in under __DEV__ and stripped from production bundles.
  require("./ReactotronConfig");
}

registerRootComponent(AppRoot);
