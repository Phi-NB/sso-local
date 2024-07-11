import jwt from "jsonwebtoken";
import { params } from "./params";
import { LOCALE_CODE, URL_QUERY_KEY } from "@/constants";
import { isPathOrURL } from "./check";
import { get } from "lodash";
import { TIME_EXP_CLIENT_SECRET, TIME_NOW } from "@/configs";
import { uuid } from "uuidv4";

export const getFinalRedirectUrl = () => {
  const finalRedirectUri =
    (params && params.get(URL_QUERY_KEY.FINAL_REDIRECT_URI)) || "";
  if (isPathOrURL(finalRedirectUri)) {
    return finalRedirectUri;
  } else {
    return "";
  }
};

export const getCurrentHref = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return get(window?.location?.href?.split("?"), "0", "");
};

export const decodeURIForURL = (url: URL) => {
  if (typeof window === "undefined") {
    return "";
  }
  const protocol = url.protocol;
  const host = url.host;
  const pathname = decodeURIComponent(url.pathname);
  const search = decodeURIComponent(url.search);
  const hash = decodeURIComponent(url.hash);

  return `${protocol}//${host}${pathname}${search}${hash}`;
};

export const getAuthRedirectUrl = (
  codeVerifier?: string,
  locale: string = LOCALE_CODE.EN,
  redirectBack = true,
  finalRedirectUri?: string
) => {
  // const localeStr = `/${locale}`;
  const AUTH_REDIRECT_URL = window.origin + "/login";
  const redirectURL = new URL(AUTH_REDIRECT_URL);
  codeVerifier && redirectURL.searchParams.set("code_verifier", codeVerifier);
  if (redirectBack) {
    redirectURL.searchParams.set(
      URL_QUERY_KEY.FINAL_REDIRECT_URI,
      `${decodeURIComponent(finalRedirectUri || getCurrentHref())}`
    );
  }

  return decodeURIForURL(redirectURL);
};

export const getAuthRedirectUrlWithLocale = (
  redirectUri: string,
  locale: string = LOCALE_CODE.VI,
  redirectBack = true,
  finalRedirectUri?: string
) => {
  const localeStr = `/${locale}`;

  const AUTH_REDIRECT_URL = redirectUri + localeStr + "/login";
  const redirectURL = new URL(AUTH_REDIRECT_URL);
  redirectURL.searchParams.set("localeStr", locale);
  if (redirectBack) {
    redirectURL.searchParams.set(
      URL_QUERY_KEY.FINAL_REDIRECT_URI,
      `${get(
        decodeURIComponent(redirectUri + `/${locale}` + finalRedirectUri).split(
          "?"
        ),
        "0",
        ""
      )}`
    );
  }

  return decodeURIForURL(redirectURL);
};

export const generateClientSecretJwt = (
  clientId: string,
  clientSecretKey: string,
  issuer: string
) => {
  const payload = {
    iss: clientId,
    sub: clientId,
    aud: issuer,
    iat: TIME_NOW,
    exp: TIME_EXP_CLIENT_SECRET,
    jti: uuid(),
  };

  const clientSecretJwt = jwt.sign(payload, clientSecretKey as string, {
    algorithm: "HS256",
  });

  return clientSecretJwt;
};
