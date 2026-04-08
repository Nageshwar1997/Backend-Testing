import { google } from "googleapis";
import axios from "axios";
import { ParsedQs } from "qs";
import { sharedUtils } from "../utils";
import { TSharedInternal } from "../types";
import { envs } from "../envs";

const getSocialAuthRedirectURL = (
  provider: Exclude<TSharedInternal.TAuthProvider, "MANUAL">,
) => {
  const baseURL = sharedUtils.getUrl.backend();

  const redirectMap: Partial<
    Record<Exclude<TSharedInternal.TAuthProvider, "MANUAL">, string>
  > = {
    GOOGLE: envs.oAuth.google.redirect_endpoint,
    LINKEDIN: envs.oAuth.linkedin.redirect_endpoint,
    GITHUB: envs.oAuth.github.redirect_endpoint,
  };

  return `${baseURL}${redirectMap[provider]}`;
};

const googleAuthConfig = new google.auth.OAuth2(
  envs.oAuth.google.client_id,
  envs.oAuth.google.client_secret,
  getSocialAuthRedirectURL("GOOGLE"),
);

const googleAuthClient = {
  url: googleAuthConfig.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
    redirect_uri: getSocialAuthRedirectURL("GOOGLE"),
  }),

  decode: async (code: string | ParsedQs | (string | ParsedQs)[]) => {
    const { tokens } = await googleAuthConfig.getToken(code.toString());

    googleAuthConfig.setCredentials(tokens);

    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${tokens.access_token}` } },
    );

    return data;
  },
};

const linkedinAuthClient = {
  url: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${envs.oAuth.linkedin.client_id}&redirect_uri=${encodeURIComponent(
    getSocialAuthRedirectURL("LINKEDIN"),
  )}&scope=openid%20profile%20email`,
  token_response: async (code: string | ParsedQs | (string | ParsedQs)[]) => {
    const { data } = await axios.post(
      `https://www.linkedin.com/oauth/v2/accessToken`,
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: getSocialAuthRedirectURL("LINKEDIN"),
          client_id: envs.oAuth.linkedin.client_id,
          client_secret: envs.oAuth.linkedin.client_secret,
        },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );

    return data;
  },
  decode: (id_token: string) => {
    const base64Payload = id_token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(base64Payload, "base64").toString());

    return decoded;
  },
};

const githubAuthClient = {
  url: `https://github.com/login/oauth/authorize?${new URLSearchParams({
    client_id: envs.oAuth.github.client_id,
    redirect_uri: getSocialAuthRedirectURL("GITHUB"),
    scope: "read:user user:email",
    allow_signup: "true",
  }).toString()}`,
  token_response: async (code: string | ParsedQs | (string | ParsedQs)[]) => {
    const { data } = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: envs.oAuth.github.client_id,
        client_secret: envs.oAuth.github.client_secret,
        code,
        redirect_uri: getSocialAuthRedirectURL("GITHUB"),
      },
      { headers: { Accept: "application/json" } },
    );

    return data;
  },
  decode: async (access_token: string) => {
    const headers = { Authorization: `Bearer ${access_token}` };

    const { data } = await axios.get("https://api.github.com/user", {
      headers,
    });

    const profile = data;

    if (!profile.email) {
      const { data: emails } = await axios.get(
        "https://api.github.com/user/emails",
        { headers },
      );

      const email =
        emails.find((email: Record<string, string | boolean>) => email.primary)
          ?.email || emails[0]?.email;
      profile.email = email || "";
    }

    return profile;
  },
};

export const oAuthConfig = {
  google: googleAuthClient,
  linkedin: linkedinAuthClient,
  github: githubAuthClient,
};
