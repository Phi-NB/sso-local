import NProgress from "nprogress";

export function onStart() {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
}

export function onComplete() {
  NProgress.done();
  if (typeof window !== "undefined") {
    const elmPageWrapper = document.getElementById("page-wrapper");
    if (elmPageWrapper) {
      elmPageWrapper.scrollTo(0, 0);
    }
  }
}
