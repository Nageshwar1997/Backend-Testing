import { Types } from "mongoose";
import { envs } from "../../envs";
import { TFieldErrors } from "../../types";
import { TRole } from "@beautinique/be-constants";
import { AppError } from "@/classes";

const getURL = (devUrl: string, prodUrl: string) => {
  return envs.is_dev ? devUrl : prodUrl;
};

const getFrontendURL = (role: TRole) => {
  const roleUrlMap: Record<TRole, string> = {
    ADMIN: getURL(envs.url.frontend.dev.admin, envs.url.frontend.prod.admin),
    SELLER: getURL(envs.url.frontend.dev.admin, envs.url.frontend.prod.admin),
    MASTER: getURL(envs.url.frontend.dev.master, envs.url.frontend.prod.master),
    USER: getURL(envs.url.frontend.dev.client, envs.url.frontend.prod.client),
  };

  return roleUrlMap[role] ?? roleUrlMap.USER;
};

const getBackendURL = () => {
  return getURL(envs.url.backend.dev, envs.url.backend.prod);
};

const stringifyData = (data: unknown): string => {
  try {
    return JSON.stringify(data);
  } catch {
    return "";
  }
};

const parseData = (rawData: string) => {
  try {
    return JSON.parse(rawData);
  } catch {
    return null;
  }
};

const segregateErrors = (errors: { field: string; message: string }[]) => {
  const fieldErrors: TFieldErrors = {};
  const globalErrors: string[] = [];

  errors.forEach(({ field, message }) => {
    if (!field) {
      globalErrors.push(message);
      return;
    }

    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }

    fieldErrors[field].push(message);
  });

  return { fieldErrors, globalErrors };
};

const isValidMongoId = (
  id: string | string[],
  message: string,
  statusCode?: number,
): boolean => {
  const isValid = Array.isArray(id)
    ? id.every((id) => Types.ObjectId.isValid(id))
    : Types.ObjectId.isValid(id);

  if (!isValid) {
    console.log(`Invalid ObjectId, ${message} : `, id);
    throw new AppError({
      message,
      code: "VALIDATION_ERROR",
      statusCode: statusCode || 400,
    });
  }

  return true;
};

export const getAuthorizationToken = (token: string) => {
  return token.startsWith("Bearer ") ? token.split(" ")?.[1] : token;
};

export const sharedUtils = {
  getUrl: {
    frontend: getFrontendURL,
    backend: getBackendURL,
  },
  JSON: {
    stringify: stringifyData,
    parse: parseData,
  },
  segregateErrors,
  isValidMongoId,
  getAuthorizationToken,
};
