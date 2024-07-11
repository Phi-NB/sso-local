"use client";

import { getAuthLoginUrl } from "@/configs/auth";
import Page from "@/layouts/Page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { decodeURIForURL, getAuthRedirectUrl } from "@/utils/auth";
import base64url from "base64url";
import Image from "next/image";
import { createHash, randomBytes } from "crypto";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { requestLogout } from "@/services/auth";
import { setAuthenticate } from "@/redux/reducers/auth";
import { useCookies } from "react-cookie";
import { TIME_EXP_CLIENT_SECRET } from "@/configs";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized, account } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [_, setCookie] = useCookies();

  const loginWithCitizen = async () => {
    if (window !== undefined) {
      const codeVerifier = base64url.encode(randomBytes(32));
      const codeChallenge = base64url.encode(
        createHash("sha256").update(codeVerifier).digest()
      );
      setCookie("code_verifier", codeVerifier, {
        expires: new Date(TIME_EXP_CLIENT_SECRET * 1000),
      });
      window.location.href = decodeURIForURL(
        new URL(getAuthLoginUrl(getAuthRedirectUrl(), codeChallenge))
      );
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
    if (!refreshToken) {
      console.log("No refresh token");
      return;
    }
    try {
      await requestLogout(refreshToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      dispatch(setAuthenticate({ isAuthenticated: false, account: null }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page>
      <div className="home-page">
        <div className="empty-login">
          <Image src={"/logo-saw.png"} width={150} height={90} alt="logo" />
          {isAuthenticated && isInitialized ? (
            <div className="login-success text-[#1890FF]">
              <h1 className="text-2xl font-bold text-center mb-3">
                Login Success
              </h1>
              <h1 className="text-xl font-bold">
                User Id: {account?.userId || "Error"}
              </h1>
              <button
                className="btn btn-login !bg-[#ffbb00] mx-auto mt-6"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="btn btn-login" onClick={loginWithCitizen}>
              Login
            </button>
          )}
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
