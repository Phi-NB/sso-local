import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "./navigation";
import { NextRequest, NextResponse } from "next/server";

export const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: defaultLocale,
  localePrefix: localePrefix,
  localeDetection: true,
});

export default async function middleware(req: NextRequest) {
  if (!locales.includes("en")) {
    const pathNameArr = req.nextUrl.pathname.split("/");
    if (pathNameArr.length > 2 && pathNameArr[1] === "en") {
      req.nextUrl.pathname = req.nextUrl.pathname.replace("/en", "");
    }
  }

  if (req.nextUrl.pathname.startsWith("/heroPublic")) {
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
  }

  const res = intlMiddleware(req);
  // const ip = req.headers.get(REQ_HEADER_IP) ?? undefined;
  // if (ip?.includes('.') || ip?.includes(':')) {
  //   const countryCode = await getGeoByIp(ip);
  //   const timeStamp = `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`;
  //   console.log(`${timeStamp} ${ip} ${countryCode} ${req.nextUrl.pathname}`);
  //   if (countryCode) {
  //     res.cookies.set(COOKIE_NAME.COUNTRY_CODE, countryCode, {
  //       httpOnly: false
  //     });
  //   }
  // }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
