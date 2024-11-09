import { cn } from "@/lib/utils";

import React from "react";

type Props = {
  className?: string;
  title?: string;
  imageSrc?: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
};

export const EmptyState = ({
  children,
  width = 100,
  height = 100,
  imageSrc = "/icons/empty.svg",
  className,
  title = "No Data Found",
}: Props) => {
  return (
    <section
      className={cn(
        "bg-white text-center p-4 rounded-md shadow-sm border",
        className
      )}
    >
      <img
        src={imageSrc}
        alt="Empty"
        width={width}
        height={height}
        className="mx-auto"
      />
      <h2 className="font-medium text-lg mt-4">{title}</h2>
      {children}
    </section>
  );
};
