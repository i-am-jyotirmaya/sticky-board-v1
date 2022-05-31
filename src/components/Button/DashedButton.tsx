import { PlusCircleFilled } from "@ant-design/icons";
import classNames from "classnames";
import React from "react";

export const DashedButton: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props): JSX.Element => {
  const defaultClasses =
    "border-slate-400 border-dashed border-2 rounded-lg text-center text-xl p-4 flex justify-center items-center text-slate-400 font-medium tracking-wide transition-all duration-300 hover:text-white hover:bg-slate-500 hover:bg-opacity-20 cursor-pointer active:bg-opacity-50";
  const classes = classNames(defaultClasses, props.className);
  return (
    <div {...props} className={classes}>
      {props.children}
    </div>
  );
};
