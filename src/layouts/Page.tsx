"use client";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import clsx from "clsx";

interface IPageProps {
  children: React.ReactNode;
}

const Page = (props: IPageProps) => {
  const { children } = props;
  const { isLoading } = useAppSelector((state: RootState) => state.main);

  return (
    <div id="page">
      <div className={`page-container`}>
        <div className={clsx("default-page")}>
          {isLoading ? null : children}
        </div>
      </div>
    </div>
  );
};

export default Page;
