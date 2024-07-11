import { LOCALE_CODE, LOCAL_STORAGE_KEY, URL_QUERY_KEY } from "@/constants";

const AUTH_BASE_URL = `${process.env.NEXT_PUBLIC_SSO_AUTH_URL}/oauth2/authorize`;
export const AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_SSO_AUTH_CLIENT_ID;
// const AUTH_LOGIN_SCOPE = "openid";
const AUTH_LOGIN_SCOPE = "read";
const AUTH_LOGIN_RESPONSE_TYPE = "code";
const AUTH_LOGIN_RESPONSE_MODE = "query";
// const AUTH_LOGIN_RESPONSE_TYPE = "token";
// const AUTH_LOGIN_RESPONSE_MODE = "fragment";

export const getAuthLoginUrl = (
  redirectURL: string,
  codeChallenge?: string
) => {
  if (typeof window === "undefined" || !AUTH_BASE_URL) {
    return "/";
  }
  const url = new URL(AUTH_BASE_URL);
  const params = new URLSearchParams(url.search);
  params.set(URL_QUERY_KEY.CLIENT_ID, `${AUTH_CLIENT_ID}`);
  params.set(
    URL_QUERY_KEY.REDIRECT_URI,
    `${encodeURIComponent("http://localhost:3002/login")}`
  );
  // params.set(URL_QUERY_KEY.SCOPE, `read`);
  params.set(URL_QUERY_KEY.RESPONSE_TYPE, `${AUTH_LOGIN_RESPONSE_TYPE}`);
  // params.set(URL_QUERY_KEY.RESPONSE_MODE, `${AUTH_LOGIN_RESPONSE_MODE}`);
  // codeChallenge && params.set(URL_QUERY_KEY.CODE_CHALLENGE, codeChallenge);
  // codeChallenge && params.set(URL_QUERY_KEY.CODE_CHALLENGE_METHOD, "S256");
  url.search = params.toString();
  return url.toString();
};

export const AUTO_SIGN_UP_URL = process.env.NEXT_PUBLIC_SSO_AUTH_SIGN_UP || "";

export const getAuthSignUpUrl = (
  origin: string,
  locale: string = LOCALE_CODE.EN,
  status?: string,
  finalRedirectUri?: string
) => {
  if (!AUTH_BASE_URL) {
    return "/";
  }

  const localeStr = `/${locale}`;

  const AUTH_REDIRECT_URL = origin + localeStr + "/login";
  const newAuthURL = new URL(AUTH_REDIRECT_URL);
  const searchParamAuth = new URLSearchParams(newAuthURL.search);
  status === "1" && searchParamAuth.set(URL_QUERY_KEY.BINDING, status);
  searchParamAuth.set(URL_QUERY_KEY.LOCAL_STR, locale);
  finalRedirectUri &&
    searchParamAuth.set(URL_QUERY_KEY.FINAL_REDIRECT_URI, finalRedirectUri);

  newAuthURL.search = searchParamAuth.toString();

  const url = new URL(AUTH_BASE_URL);
  const params = new URLSearchParams(url.search);
  params.set(
    URL_QUERY_KEY.REDIRECT_URI,
    encodeURIComponent(newAuthURL.toString())
  );
  params.set(URL_QUERY_KEY.CLIENT_ID, `${AUTH_CLIENT_ID}`);
  params.set(URL_QUERY_KEY.SCOPE, `${AUTH_LOGIN_SCOPE}`);
  params.set(URL_QUERY_KEY.RESPONSE_TYPE, `${AUTH_LOGIN_RESPONSE_TYPE}`);
  params.set(URL_QUERY_KEY.RESPONSE_MODE, `${AUTH_LOGIN_RESPONSE_MODE}`);
  params.set(URL_QUERY_KEY.SIGNUP, `1`);
  status === "1" &&
    params.set(
      URL_QUERY_KEY.GUEST_INFO,
      `${encodeURI(localStorage.getItem(LOCAL_STORAGE_KEY.GUEST_INFO) || "")}`
    );
  status === "1" && params.set(URL_QUERY_KEY.BINDING, status);

  url.search = params.toString();
  return url.toString();
};

export const getAuthLoginUrlWithRedirect = (redirectUrl: string) => {
  if (!AUTH_BASE_URL) {
    return "/";
  }
  const AUTH_REDIRECT_URL = redirectUrl;
  const url = new URL(AUTH_BASE_URL);
  const params = new URLSearchParams(url.search);
  params.set(URL_QUERY_KEY.CLIENT_ID, `${AUTH_CLIENT_ID}`);
  params.set(
    URL_QUERY_KEY.REDIRECT_URI,
    `${decodeURIComponent(AUTH_REDIRECT_URL)}`
  );
  params.set(URL_QUERY_KEY.SCOPE, `${AUTH_LOGIN_SCOPE}`);
  params.set(URL_QUERY_KEY.RESPONSE_TYPE, `${AUTH_LOGIN_RESPONSE_TYPE}`);
  params.set(URL_QUERY_KEY.RESPONSE_MODE, `${AUTH_LOGIN_RESPONSE_MODE}`);
  url.search = params.toString();
  return url.toString();
};
