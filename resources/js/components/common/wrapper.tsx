import { cn } from "@/lib/utils";
import { ClassValue } from "class-variance-authority/types";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: ClassValue;
};

const DefaultWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn("max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto mt-10", className)}
    >
      {children}
    </div>
  );
};

export default DefaultWrapper;
