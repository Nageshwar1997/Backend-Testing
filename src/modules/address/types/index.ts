import { TAddress } from "@beautinique/be-zod";
import { _ID, TId, TTimestamp } from "@/types";

export interface IAddress extends Document, TAddress, TId, TTimestamp {
  user: _ID;
}
