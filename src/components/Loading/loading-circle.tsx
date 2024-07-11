import React from "react";
import { motion } from "framer-motion";

interface ILoadingCircle {
  children?: React.ReactNode;
  className?: string;
}

export const LoadingCircle = (props: ILoadingCircle) => {
  return (
    <div className={`loading-circle ${props.className ? props.className : ""}`}>
      <div className="container-circle">
        <motion.svg
          className="loader"
          height="24"
          viewBox="0 0 50 50"
          width="24"
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", repeat: Infinity, duration: 4 }}
          style={{ originX: "-50%", originY: "-50%" }}
        >
          <circle
            className="loader__bg-circle"
            cx="25"
            cy="25"
            fill="none"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <motion.circle
            cx="25"
            cy="25"
            fill="none"
            r="20"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            animate={{
              strokeDasharray: ["1, 150", "90, 150", "90, 150"],
              strokeDashoffset: [0, -35, -125],
            }}
            transition={{ ease: "easeInOut", repeat: Infinity, duration: 2 }}
          />
        </motion.svg>
      </div>
      {props.children}
    </div>
  );
};
