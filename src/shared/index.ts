import { sharedClasses } from "./classes";
import { sharedConfigs } from "./configs";
import { sharedConstants } from "./constants";
import { envs } from "./envs";
import { sharedMiddlewares } from "./middlewares";
import { sharedRouter } from "./router";
import { sharedServices } from "./services";
import { sharedUtils } from "./utils";

export * as TShared from "./types";

export const shared = {
  utils: sharedUtils,
  envs,
  classes: sharedClasses,
  constants: sharedConstants,
  services: sharedServices,
  configs: sharedConfigs,
  middlewares: sharedMiddlewares,
  router: sharedRouter,
};
