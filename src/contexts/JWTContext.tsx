"use client";

import { LOCAL_STORAGE_KEY } from "@/constants";
import { usePathname } from "@/hooks/usePathname";
import { useRouter } from "@/hooks/useRouter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthenticate, setInitialized } from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
import { requestValidateToken } from "@/services/auth";
import { createContext, useEffect, useRef } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: any }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { isInitialized, reAuthenticate, isAuthenticated, isGuest } =
    useAppSelector((state: RootState) => state.auth);
  const pathnameRef = useRef("");
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      isInitialized ||
      pathname === "/login"
    ) {
      return;
    }
    if (pathname === pathnameRef.current) {
      return;
    }
    pathnameRef.current = pathname;
    initialize();
  }, [pathname, isInitialized]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (reAuthenticate === 0) {
      return;
    }
    initialize();
  }, [reAuthenticate]);

  const initialize = async () => {
    try {
      let reAuthGuest = false;
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (accessToken) {
        await authByUserAccount(router);
        return;
      }
    } finally {
      dispatch(setInitialized(true));
    }
  };

  const authByUserAccount = async (router: ReturnType<typeof useRouter>) => {
    try {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (!accessToken) {
        return;
      }
      const response = await requestValidateToken(accessToken);

      if (response.status === 200) {
        dispatch(
          setAuthenticate({
            isAuthenticated: true,
            account: response.data,
            isGuest: false,
          })
        );
        return;
      }

      if (response.status === 406) {
        dispatch(
          setAuthenticate({
            isAuthenticated: false,
            account: null,
            isGuest: false,
          })
        );
        router.push("/");
        // notification('Session expired. Please login again.', 'warn');
        return;
      }

      dispatch(
        setAuthenticate({
          isAuthenticated: false,
          account: null,
          isGuest: false,
        })
      );
    } catch (err: any) {
      if (err?.error?.name === "TokenExpiredError") {
        dispatch(
          setAuthenticate({
            isAuthenticated: false,
            account: null,
            isGuest: false,
          })
        );
        router.push("/");
        // notification('Session expired. Please login again.', 'warn');
        return;
      }
      localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      dispatch(
        setAuthenticate({
          isAuthenticated: false,
          account: null,
          isGuest: false,
        })
      );
    }
  };
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
