import { sharedConfigs } from "./configs";
import { envs } from "../envs";
import { sharedMiddlewares } from "./middlewares";
import { sharedRouter } from "./router";
import { sharedUtils } from "./utils";

export * as TShared from "../types";

export const shared = {
  utils: sharedUtils,
  envs,
  configs: sharedConfigs,
  middlewares: sharedMiddlewares,
  router: sharedRouter,
};
