import { userModuleModels } from "./models";
import { userModuleServices } from "./services";

export * as TUserModule from "./types";

export const userModule = {
  models: userModuleModels,
  services: userModuleServices,
};
