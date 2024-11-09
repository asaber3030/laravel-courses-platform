import { Course } from "@/types";
import React from "react";
import { LinkBtn } from "../common/link-btn";
import QuickActivateCourse from "./quick-activate";
import DeleteCourseModal from "./delete-course-modal";
import { PageTitle } from "../common/PageTitle";
import { Link } from "@inertiajs/react";
import { Edit } from "lucide-react";

export function ViewCoursePageTitle({
  course,
  label = "الكورس",
  href,
}: {
  course: Course;
  label?: string;
  href: string;
}) {
  const pageTitle = (
    <Link href={href} className="hover:underline hover:text-blue-600">
      {label} - <bdi>{course.title}</bdi>
    </Link>
  );

  return (
    <PageTitle
      title={pageTitle}
      className="mb-4 pb-2 border-b xl:flex-row flex-col gap-2"
    >
      <LinkBtn
        href={route("courses.update.view", course.id)}
        variant="outline"
        icon={Edit}
      >
        تعديل
      </LinkBtn>
      <QuickActivateCourse courseId={course.id} />
      <DeleteCourseModal courseId={course.id} />
    </PageTitle>
  );
}
