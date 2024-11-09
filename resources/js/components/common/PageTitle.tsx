import { cn } from "@/lib/utils";
import { ClassValue } from "class-variance-authority/types";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: ClassValue;
  title: React.ReactNode;
};
export const PageTitle = ({ title, children, className }: Props) => {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex gap-2 items-center">{children}</div>
    </div>
  );
};
