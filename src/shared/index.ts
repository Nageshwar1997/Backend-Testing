import { sharedClasses } from "./classes";
import { sharedConfigs } from "./configs";
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
  services: sharedServices,
  configs: sharedConfigs,
  middlewares: sharedMiddlewares,
  router: sharedRouter,
};
