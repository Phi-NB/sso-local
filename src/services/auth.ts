import axios from "axios";

export const requestGetTokenWithCode = (
  code: string,
  redirectUrl: string,
  codeVerify?: string
) => {
  const data = {
    code,
    redirectUrl,
    ...(codeVerify && { codeVerify: codeVerify }),
  };

  return axios({
    method: "POST",
    url: `/api/v1/get-token-with-code`,
    data,
  });
};

export const requestValidateToken = (token: string) => {
  return axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_URL_RESOURCES_SERVER}/api/v1/auth`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const requestLogout = (refreshToken: string) => {
  const data = {
    refreshToken,
  };

  return axios({
    method: "POST",
    url: `/api/v1/logout`,
    data,
  });
};
