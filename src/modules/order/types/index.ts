import { TAddressModule } from "@/modules/address";
import { TCartProductModule } from "@/modules/cart-product";
import {
  TOrderStatus,
  TPaymentCurrency,
  TPaymentMethod,
  TPaymentMode,
  TPaymentRefundStatus,
  TPaymentStatus,
} from "@beautinique/be-constants";
import { Types } from "mongoose";

type TPayment = {
  mode: TPaymentMode;
  status: TPaymentStatus;
  currency: TPaymentCurrency;
  rzp_order_id?: string;
  rzp_payment_id?: string;
  rzp_signature?: string;
  rzp_order_receipt: string;
  rzp_payment_receipt?: string;
  amount: number;
  paid_at?: Date;
  email: string;
  contact: string;
  method: TPaymentMethod;
  fee: number;
  tax: number;
};

type TTransaction = {
  // UPI Transaction
  upi_rrn?: string;
  upi_transaction_id?: string;
  upi_vpa?: string;
  upi_flow?: string;

  // CARD Transaction
  card_token_id?: string;
  card_auth_code?: string;
  card_id?: string;
  card_name?: string;
  card_last4?: string;
  card_network?: string;
  card_type?: string;
  card_issuer?: string;

  // WALLET Transaction
  wallet?: string;

  // NETBANKING Transaction
  netbanking_bank_transaction_id?: string;
  netbanking_bank?: string;
};

export interface IOrder {
  _id: Types.ObjectId;
  payment: TPayment;
  transaction?: TTransaction;
  user: Types.ObjectId;
  addresses: {
    shipping: Omit<TAddressModule.TAddress, "user"> | null;
    billing: Omit<TAddressModule.TAddress, "user"> | null;
    both: Omit<TAddressModule.TAddress, "user"> | null;
  };
  products: TCartProductModule.IPopulatedCartProduct[];
  refund_status: TPaymentRefundStatus;
  discount: number;
  charges: number;
  status: TOrderStatus;
  delivered_at?: Date;
  cancelled_at?: Date;
  returned_at?: Date;
  refunded_at?: Date;
  reason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export * as TOrderModuleInternal from ".";
