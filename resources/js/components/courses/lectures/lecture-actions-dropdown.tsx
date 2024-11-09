import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseLecture } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  lecture: CourseLecture;
  children?: React.ReactNode;
  asChild?: boolean;
};

export const LectureActionsDropdown = ({
  lecture,
  children,
  asChild = true,
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={asChild}>
        {children ? (
          children
        ) : (
          <Button variant="ghost">
            <MoreHorizontal className="size-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>تعديل</DropdownMenuItem>
        <DropdownMenuItem>المحاضرات</DropdownMenuItem>
        <DropdownMenuItem>التقييمات</DropdownMenuItem>
        <DropdownMenuItem>الاشتراكات</DropdownMenuItem>
        <DropdownMenuItem>تفعيل الكورس لشخص</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
