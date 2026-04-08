import { Types } from "mongoose";
import { TUserModuleInternal } from "../types";
import { shared } from "@/shared";
import { userModuleModels } from "../models";

export const getUserByEmail = async (
  email: string,
  lean?: boolean,
): Promise<TUserModuleInternal.IUser | null> => {
  let user: TUserModuleInternal.IUser | null = null;
  if (lean) {
    user = await userModuleModels.User.findOne({ email }).lean();
  } else {
    user = await userModuleModels.User.findOne({ email });
  }
  return user;
};

export const updateUser = async (
  userId: string | Types.ObjectId | undefined,
  data: Partial<TUserModuleInternal.IUser>,
): Promise<TUserModuleInternal.IUser> => {
  if (!userId)
    throw new shared.classes.AppError({
      message: "UserId not provided",
      statusCode: 400,
    });

  const user = await userModuleModels.User.findByIdAndUpdate(userId, data, {
    new: true,
  });

  if (!user)
    throw new shared.classes.AppError({
      message: "User not found to update",
      statusCode: 404,
      code: "NOT_FOUND",
    });

  if (user) {
    await shared.services.redis.setCachedUser(user);
  }

  return user;
};

export const getUserByPhoneNumber = async (
  phoneNumber: string,
  lean?: boolean,
): Promise<TUserModuleInternal.IUser | null> => {
  let user: TUserModuleInternal.IUser | null = null;
  if (lean) {
    user = await userModuleModels.User.findOne({ phoneNumber }).lean();
  } else {
    user = await userModuleModels.User.findOne({ phoneNumber });
  }
  return user;
};

export const getUserByEmailOrPhoneNumber = async (
  email: string,
  phoneNumber: string,
  lean?: boolean,
): Promise<TUserModuleInternal.IUser | null> => {
  let user: TUserModuleInternal.IUser | null = null;
  if (lean) {
    user = await userModuleModels.User.findOne({
      $or: [{ email }, { phoneNumber }],
    }).lean();
  } else {
    user = await userModuleModels.User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
  }

  if (!user) {
    throw new shared.classes.AppError({
      message: "User not found",
      statusCode: 404,
      code: "NOT_FOUND",
      fieldErrors: {
        ...(email && { email: ["User not found"] }),
        ...(phoneNumber && { phoneNumber: ["User not found"] }),
      },
    });
  }

  return user;
};

export const getUserById = async ({
  id,
  lean = true,
  password = false,
}: {
  id: string | Types.ObjectId;
  lean?: boolean;
  password?: boolean;
}): Promise<TUserModuleInternal.IUser> => {
  let query = userModuleModels.User.findById(id);

  if (lean) query = query.lean() as typeof query;
  if (password) query = query.select("-password");

  const user: TUserModuleInternal.IUser | null = await query;

  if (!user)
    throw new shared.classes.AppError({
      message: "User not found",
      statusCode: 404,
      code: "NOT_FOUND",
    });

  return user;
};

export const userModuleServices = {
  get: {
    user_by_email: getUserByEmail,
    user_by_phone_number: getUserByPhoneNumber,
    user_by_email_or_phone_number: getUserByEmailOrPhoneNumber,
    user_by_id: getUserById,
  },
  update: {
    user: updateUser,
  },
};
