import { envs } from "../envs";
import { TSharedInternal } from "../types";

const AUTH_PROVIDERS: TSharedInternal.TAuthProvider[] = [
  "MANUAL",
  "GOOGLE",
  "LINKEDIN",
  "GITHUB",
] as const;

const ALLOWED_ORIGINS = [
  envs.url.frontend.prod.client,
  envs.url.frontend.prod.admin,
  envs.url.frontend.prod.master,
  envs.url.frontend.dev.client,
  envs.url.frontend.dev.admin,
  envs.url.frontend.dev.master,
  envs.url.frontend.dev.public1,
  envs.url.frontend.dev.public2,
];

const ROLES: TSharedInternal.TRole[] = [
  "USER",
  "SELLER",
  "ADMIN",
  "MASTER",
] as const;

const ADDRESS_TYPES = ["shipping", "billing", "both"];

const STATES_AND_UNION_TERRITORIES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (National Capital Territory of Delhi)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const ALLOWED_COUNTRIES = ["India"];

const ALLOWED_BUSINESSES = [
  "Individual",
  "Freelance Seller",
  "Small Business",
  "Home-based Seller",
  "Retail Store",
  "Salon",
  "Wholesale Distributor",
];

const MINUTE = 60;
const HOUR = MINUTE ** 2;

const OTP_EXPIRY = 10 * MINUTE;

const MAX_RESEND = 3;

const regex = {
  PHONE_START: /^[6-9]/, // Starts with 6, 7, 8, or 9
  PHONE_EXACT_LENGTH: /^\d{10}$/, // Exactly 10 digits
  PHONE: /^[6-9][0-9]{9}$/, // Phone number e.g. 9876543210
  NO_SPACE: /^\S+$/, // No spaces allowed
  SINGLE_SPACE: /^(?!.* {2,}).*$/s, // Single space allowed
  DATE: /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|([+-]\d{2}:\d{2}))?)?$/, // Date e.g. 2022-01-01T12:00:00Z
  NAME: /^(?!.*\d)(?!.* {2})([A-Za-z]+( [A-Za-z]+)*)$/, // Only letters & single space
  EMAIL:
    /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(-?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/, // Email e.g. 3oYQK@example.com
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])(?=\S.*$).{6,20}$/, // Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long
  HEX_CODE:
    /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, // Hex color code
  ESCAPE_SPECIAL_CHARS: /[.*+?^${}()|[\]\\]/g,
  GST: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i, // Check valid GST number
  PIN_CODE: /^[1-9][0-9]{5}$/, // Check valid pin code
  OTP: /^[0-9]{6}$/, // OTP e.g. 123456
  URL: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/i,
  PAN: /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/,
  AT_LEAST_ONE_UPPERCASE_LETTER: /[A-Z]/, // At least one uppercase letter
  AT_LEAST_ONE_LOWERCASE_LETTER: /[a-z]/, // At least one lowercase letter
  AT_LEAST_ONE_DIGIT: /\d/, // At least one digit
  AT_LEAST_ONE_SPECIAL_CHARACTER: /[@$!%*?&#]/, // At least one special character
  ONLY_DIGITS: /^\d+$/, // All characters are digits
  ONLY_UPPERCASE: /^[A-Z]+$/, // All characters are uppercase
  ONLY_LOWERCASE: /^[a-z]+$/, // All characters are lowercase
  ONLY_LETTERS: /^[a-zA-Z]+$/, // All characters are letters
  ONLY_LETTERS_AND_SPACES: /^[a-zA-Z\s]+$/, // All characters are letters and spaces
  ONLY_LETTERS_AND_SPACES_AND_DOTS: /^[a-zA-Z\s.]+$/, // Only letters, spaces, and dots
};

const KB = 1024; // 1KB
const MB = KB ** 2; // 1MB

const size = {
  MB: MB, // 1MB
  IMAGE: MB * 2, // 2MB
  VIDEO: MB * 50, // 50MB
  OTHER: MB * 2, // 2MB
};

const formats = {
  IMAGE: ["jpeg", "png", "webp", "jpg", "svg+xml"].map((ext) => `image/${ext}`),
  VIDEO: ["mp4", "webm"].map((ext) => `video/${ext}`),
};

const zodStringOptions: Record<
  "EMAIL" | "PHONE_NUMBER" | "PASSWORD" | "NAME" | "OTP",
  TSharedInternal.IZodStringConfigs
> = {
  EMAIL: {
    allowSpace: "noSpace",
    field: "email",
    label: "Email",
    lowerOrUpper: "lower",
    customRegex: { regex: regex.EMAIL, message: "must be valid" },
  },
  PHONE_NUMBER: {
    field: "phoneNumber",
    label: "Phone number",
    allowSpace: "noSpace",
    customRegexes: [
      { regex: regex.PHONE_START, message: "must be start with 6, 7, 8, or 9" },
      { regex: regex.PHONE_EXACT_LENGTH, message: "must be exactly 10 digits" },
      {
        regex: regex.PHONE,
        message: "must be exactly 10 digits and must start with 6, 7, 8, or 9",
      },
    ],
  },
  PASSWORD: {
    field: "password",
    label: "Password",
    allowSpace: "noSpace",
    min: 6,
    max: 20,
    customRegexes: [
      {
        regex: regex.AT_LEAST_ONE_UPPERCASE_LETTER,
        message: "must contain at least one uppercase letter",
      },
      {
        regex: regex.AT_LEAST_ONE_LOWERCASE_LETTER,
        message: "must contain at least one lowercase letter",
      },
      {
        regex: regex.AT_LEAST_ONE_DIGIT,
        message: "must contain at least one number",
      },
      {
        regex: regex.AT_LEAST_ONE_SPECIAL_CHARACTER,
        message: "must contain at least one special character e.g. @$!%*?&#",
      },
      {
        regex: regex.PASSWORD,
        message:
          "must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    ],
  },
  NAME: {
    field: "name",
    label: "Name",
    min: 2,
    max: 50,
    allowSpace: "singleSpace",
    customRegex: { regex: regex.NAME, message: "can only contain letters" },
  },
  OTP: {
    field: "otp",
    label: "OTP",
    min: 6,
    max: 6,
    allowSpace: "noSpace",
    customRegex: { regex: regex.OTP, message: "must be 6 digits" },
  },
};

const ALLOWED_PAYMENT_MODE = ["ONLINE"];
const ALLOWED_CURRENCIES = ["INR"];

const ORDER_STATUS = [
  "PENDING",
  "FAILED",
  "PROCESSING",
  "CONFIRMED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const RAZORPAY_PAYMENT_METHODS = [
  "CARD",
  "UPI",
  "NETBANKING",
  "WALLET",
  // "PAYLATER", // *LINK - Not Implemented yet in FRONTEND & BACKEND
  // "EMI", // *LINK - Not Implemented yet in FRONTEND & BACKEND
  "OTHER",
];

const RAZORPAY_PAYMENT_STATUS = [
  "UNPAID",
  "CAPTURED",
  "PAID",
  "FAILED",
  "REFUNDED",
];

const RAZORPAY_REFUND_PAYMENT_STATUS = [
  "REQUESTED",
  "APPROVED",
  "REFUNDED",
  "FAILED",
];

const ORDER_STATUS_PRIORITY: Record<(typeof ORDER_STATUS)[number], number> = {
  PENDING: 1,
  PROCESSING: 2,
  CONFIRMED: 3,
  DELIVERED: 4,

  FAILED: 0, // terminal
  CANCELLED: 0, // terminal
  RETURNED: 0, // terminal
};

const PAYMENT_STATUS_PRIORITY: Record<
  (typeof RAZORPAY_PAYMENT_STATUS)[number],
  number
> = {
  UNPAID: 0,
  CAPTURED: 1,
  PAID: 2,
  REFUNDED: 3,
  FAILED: 0,
};

const REFUND_STATUS_PRIORITY: Record<string, number> = {
  FAILED: 0, // Failed can overwrite anything
  REQUESTED: 1,
  APPROVED: 2,
  REFUNDED: 3,
};

export const sharedConstants = {
  AUTH_PROVIDERS,
  ALLOWED_ORIGINS,
  ROLES,
  ADDRESS_TYPES,
  STATES_AND_UNION_TERRITORIES,
  ALLOWED_COUNTRIES,
  ALLOWED_BUSINESSES,
  MINUTE,
  HOUR,
  OTP_EXPIRY,
  MAX_RESEND,
  regex,
  size,
  formats,
  zod: { string: zodStringOptions },
  ALLOWED_PAYMENT_MODE,
  ALLOWED_CURRENCIES,
  ORDER_STATUS,
  RAZORPAY_PAYMENT_METHODS,
  RAZORPAY_PAYMENT_STATUS,
  RAZORPAY_REFUND_PAYMENT_STATUS,
  ORDER_STATUS_PRIORITY,
  PAYMENT_STATUS_PRIORITY,
  REFUND_STATUS_PRIORITY,
};
