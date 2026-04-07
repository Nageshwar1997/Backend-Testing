type TErrorCode =
  | "VALIDATION_ERROR"
  | "AUTH_ERROR"
  | "NOT_FOUND"
  | "UPLOAD_ERROR"
  | "INTERNAL_ERROR";

export type TFieldErrors = Record<string, string[]>;

export type TErrorPayload = {
  fieldErrors: TFieldErrors;
  globalErrors: string[];
};

export interface IAppError extends Partial<TErrorPayload> {
  message: string;
  statusCode: number;
  code?: TErrorCode;
  isOperational?: boolean;
}
