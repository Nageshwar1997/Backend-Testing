import { Types } from "mongoose";
import { IUser } from "../types";
import { User } from "../models";
import { AppError } from "@/classes";
import { redisService } from "@/services";

export const getUserByEmail = async (
  email: string,
  lean?: boolean,
): Promise<IUser | null> => {
  let user: IUser | null = null;
  if (lean) {
    user = await User.findOne({ email }).lean();
  } else {
    user = await User.findOne({ email });
  }
  return user;
};

export const updateUser = async (
  userId: string | Types.ObjectId | undefined,
  data: Partial<IUser>,
): Promise<IUser> => {
  if (!userId)
    throw new AppError({ message: "UserId not provided", statusCode: 400 });

  const user = await User.findByIdAndUpdate(userId, data, { new: true });

  if (!user)
    throw new AppError({
      message: "User not found to update",
      statusCode: 404,
      code: "NOT_FOUND",
    });

  if (user) {
    await redisService.setCachedUser(user);
  }

  return user;
};

export const getUserByPhoneNumber = async (
  phoneNumber: string,
  lean?: boolean,
): Promise<IUser | null> => {
  let user: IUser | null = null;
  if (lean) {
    user = await User.findOne({ phoneNumber }).lean();
  } else {
    user = await User.findOne({ phoneNumber });
  }
  return user;
};

export const getUserByEmailOrPhoneNumber = async (
  email: string,
  phoneNumber: string,
  lean?: boolean,
): Promise<IUser | null> => {
  let user: IUser | null = null;
  if (lean) {
    user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    }).lean();
  } else {
    user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
  }

  if (!user) {
    throw new AppError({
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
}): Promise<IUser> => {
  let query = User.findById(id);

  if (lean) query = query.lean() as typeof query;
  if (password) query = query.select("-password");

  const user: IUser | null = await query;

  if (!user)
    throw new AppError({
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
