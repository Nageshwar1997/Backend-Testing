import { sharedClasses } from "../classes";

export const sharedServices = {
  mail: new sharedClasses.Mail(),
  redis: new sharedClasses.Redis(),
};
