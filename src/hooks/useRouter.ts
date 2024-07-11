import { shouldTriggerStartEvent } from "@/libs/route-event";
import { defaultLocale, useRouter as useRouterOriginal } from "@/navigation";
import { onStart } from "@/utils/nprogress";
import { useLocale } from "next-intl";

export function useRouter(): ReturnType<typeof useRouterOriginal> {
  const router = useRouterOriginal();
  const locale = useLocale();
  const defaultPrefix = `/${locale}`;
  return {
    ...router,
    push: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.push(
        locale === defaultLocale &&
          !href.startsWith(defaultPrefix) &&
          !href.startsWith("http")
          ? href.startsWith("/")
            ? `${defaultPrefix}${href}`
            : `${defaultPrefix}/${href}`
          : href,
        options
      );
    },
    replace: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.replace(
        locale === defaultLocale &&
          !href.startsWith(defaultPrefix) &&
          !href.startsWith("http")
          ? `${defaultPrefix}/${href}`
          : href,
        options
      );
    },
  };
}
