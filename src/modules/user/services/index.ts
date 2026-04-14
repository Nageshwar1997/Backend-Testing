import { Types } from "mongoose";
import { IUser } from "../types";
import { User } from "../models";
import { AppError } from "@beautinique/be-classes";
import { redisService } from "@/services";
import { _ID } from "@/types";
import { envs } from "@/envs";
import jwt from "jsonwebtoken";

export const getUserByEmail = async ({
  email,
  lean,
}: Pick<IUser, "email"> & {
  lean?: boolean;
}): Promise<IUser | null> => {
  let user: IUser | null = null;
  if (lean) {
    user = await User.findOne({ email }).lean();
  } else {
    user = await User.findOne({ email });
  }
  return user;
};

export const updateUser = async (
  userId: string | Types.ObjectId,
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

export const getUserByPhoneNumber = async ({
  phoneNumber,
  lean,
}: Pick<IUser, "phoneNumber"> & {
  lean?: boolean;
}): Promise<IUser | null> => {
  let user: IUser | null = null;
  if (lean) {
    user = await User.findOne({ phoneNumber }).lean();
  } else {
    user = await User.findOne({ phoneNumber });
  }
  return user;
};

export const getUserByEmailOrPhoneNumber = async ({
  email,
  phoneNumber,
  lean,
}: Pick<IUser, "email" | "phoneNumber"> & {
  lean?: boolean;
}): Promise<IUser> => {
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
  id: string | _ID;
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

export const generateToken = (userId: _ID | string): string => {
  if (!envs.jwt_secret) {
    throw new AppError({
      message: "JWT secret not defined",
      statusCode: 500,
      code: "INTERNAL_ERROR",
    });
  }

  try {
    const token = jwt.sign({ userId }, envs.jwt_secret, { expiresIn: "1d" });

    if (!token) {
      throw new AppError({
        message: "Failed to generate token",
        statusCode: 500,
        code: "INTERNAL_ERROR",
      });
    }

    return token;
  } catch (error) {
    throw error;
  }
};
