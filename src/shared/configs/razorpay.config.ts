import Razorpay from "razorpay";
import { envs } from "../envs";

export const razorpayConfig = new Razorpay({
  key_id: envs.razorpay.key_id,
  key_secret: envs.razorpay.key_secret,
});
