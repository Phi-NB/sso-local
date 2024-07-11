"use client";

import { LoadingCircle } from "@/components/Loading/loading-circle";
import { LOCAL_STORAGE_KEY, URL_QUERY_KEY } from "@/constants";
import { usePathname } from "@/hooks/usePathname";
import { useRouter } from "@/hooks/useRouter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setAuthenticate,
  setInitialized,
  setReAuthenticate,
} from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
import { requestGetTokenWithCode, requestValidateToken } from "@/services/auth";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

const PageLogin = () => {
  const pathname = usePathname();
  const router = useRouter();
  const loginAttempted = useRef(false);
  const { isAuthenticated, isInitialized } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["code_verifier"]);

  useEffect(() => {
    if (!isAuthenticated && !isInitialized && !loginAttempted.current) {
      loginAttempted.current = true;
      handleLogin();
      return;
    } else {
      loginAttempted.current = false;
    }
    // const finalRedirectUri = getFinalRedirectUrl();
    // if (finalRedirectUri) {
    //   const url = new URL(finalRedirectUri);
    //   setTimeout(() => {
    //     window.location.href = finalRedirectUri;
    //   }, 1000);
    //   return;
    // }
    // router.push("/");
  }, [isAuthenticated]);

  const fetchToken = async (code: string, codeVerifier?: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(URL_QUERY_KEY.CODE);
    url.searchParams.delete(URL_QUERY_KEY.SESSION_STATE);
    url.searchParams.delete("iss");
    const AUTH_REDIRECT_URL = decodeURIComponent(
      decodeURIComponent(url.toString())
    );

    const response = await requestGetTokenWithCode(
      code,
      AUTH_REDIRECT_URL.replace("#_=_", "")
      // codeVerifier
    );

    const accessToken = response?.data?.access_token;
    const refreshToken = response?.data?.refresh_token;

    if (!accessToken || !refreshToken) {
      console.log("Error fetching token");
    }

    if (response.status === 200 && response?.data) {
      localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
      const result = await requestValidateToken(accessToken);

      dispatch(
        setAuthenticate({
          isAuthenticated: true,
          account: result?.data,
          isGuest: false,
        })
      );
      dispatch(setInitialized(true));
    }
  };

  const getTokenFromUrl = (): string | null => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get("access_token");
  };

  const handleLogin = async () => {
    if (typeof window !== "undefined") {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get("code");
      // const codeVerifier = sessionStorage.getItem("code_verifier");
      const codeVerifier = cookies.code_verifier;

      const accessToken = getTokenFromUrl();
      if (accessToken) {
        const result = await requestValidateToken(accessToken);
        console.log(result);
      }

      if (code) {
        try {
          // if (codeVerifier) {
          //   await fetchToken(code, codeVerifier);
          //   removeCookie("code_verifier");
          // } else {
          await fetchToken(code);
          // }
        } catch (error: any) {
          router.push("/");
        }
      } else {
        dispatch(setReAuthenticate());
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoadingCircle />
      </div>
    </div>
  );
};

export default PageLogin;
