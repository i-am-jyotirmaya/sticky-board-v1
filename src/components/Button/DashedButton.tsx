import { PlusCircleFilled } from "@ant-design/icons";
import classNames from "classnames";
import React from "react";

type DashedButtonProps = React.HTMLAttributes<HTMLDivElement>;

export const DashedButton = React.forwardRef<HTMLDivElement, DashedButtonProps>((props, ref) => {
  const defaultClasses =
    "border-slate-400 border-dashed border-2 rounded-lg text-center text-xl p-4 flex justify-center items-center text-slate-400 font-medium tracking-wide transition-all duration-300 hover:text-white hover:bg-slate-500 hover:bg-opacity-20 cursor-pointer active:bg-opacity-50";
  const classes = classNames(defaultClasses, props.className);
  return (
    <div ref={ref} {...props} className={classes}>
      {props.children}
    </div>
  );
});
