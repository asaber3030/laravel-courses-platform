import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Course } from "@/types";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { router } from "@inertiajs/react";

type Props = {
  course: Course;
  children?: React.ReactNode;
  asChild?: boolean;
};

const CourseActionsDropdown = ({ course, children, asChild = true }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={asChild}>
        {children ? (
          children
        ) : (
          <Button variant="outline">
            <MoreHorizontal className="size-4" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => router.visit(route("courses.update.view", course.id))}
        >
          تعديل
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.visit(route("courses.lectures", course.id))}
        >
          المحاضرات
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.visit(route("courses.ratings.view", course.id))}
        >
          التقييمات
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            router.visit(route("courses.subscriptions.view", course.id))
          }
        >
          الاشتراكات
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsDropdown;
