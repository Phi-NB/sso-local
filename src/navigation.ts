import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en"];
export const defaultLocale = "en";
export const localePrefix = "as-needed";
export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  {
    locales,
    localePrefix,
  }
);
