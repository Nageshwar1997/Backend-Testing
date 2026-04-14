import { sharedMiddlewares } from "./middlewares";
import { sharedUtils } from "./utils";

export * as TShared from "../types";

export const shared = {
  utils: sharedUtils,
  middlewares: sharedMiddlewares,
};
