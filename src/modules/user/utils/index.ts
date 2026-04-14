import { envs } from "@/envs";
import { getImageAsBuffer } from "@/utils";
import { TAuthProvider } from "@beautinique/be-constants";

export const authSuccessRedirectUrl = (token: string) => {
  return `${
    envs.is_dev ? envs.url.frontend.dev.client : envs.url.frontend.prod.client
  }/auth/oauth?token=${token}`;
};

const getProfilePic = async (url: string) => {
  if (!url) return "";
  const { buffer, mimetype } = await getImageAsBuffer(url);
  const file = {
    buffer,
    mimetype,
    originalname: "profile-pic.jpg",
  } as Express.Multer.File;
  const cldResp = await MediaModule.Utils.singleImageUploader({
    file,
    cloudinaryConfigOption: "image",
    folder: "Profile_Pictures",
  });

  return cldResp?.secure_url || url;
};

export const getOAuthDbPayload = async (
  data: Record<string, string>,
  provider: TAuthProvider,
) => {
  const fullName = data.name?.trim() || "";
  const nameParts = fullName.split(/\s+/);

  const firstName = data.given_name || nameParts[0];
  const lastName =
    data.family_name ||
    (nameParts.length > 1 ? nameParts?.slice(1)?.join(" ") : "") ||
    "";

  const profilePic = await getProfilePic(data.picture || data.avatar_url);

  return {
    email: data.email,
    firstName,
    lastName,
    profilePic,
    password: "",
    phoneNumber: "",
    providers: [provider],
    role: "USER",
  };
};
