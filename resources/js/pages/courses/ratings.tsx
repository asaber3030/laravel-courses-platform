import { PageTitle } from "@/components/common/PageTitle";
import { LinkBtn } from "@/components/common/link-btn";
import DefaultWrapper from "@/components/common/wrapper";
import DeleteCourseModal from "@/components/courses/delete-course-modal";
import { ViewCoursePageTitle } from "@/components/courses/page-title";
import QuickActivateCourse from "@/components/courses/quick-activate";
import { CourseRatingsList } from "@/components/courses/ratings/list";
import Authenticated from "@/layouts/authenticated-layout";
import { CourseRatingsPageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Edit } from "lucide-react";

export default function CourseRatings() {
  const { ratings, course } = usePage<CourseRatingsPageProps>().props;

  return (
    <Authenticated>
      <Head title={"تقييمات الكورس - " + course.title} />
      <DefaultWrapper>
        <ViewCoursePageTitle
          href={route("courses.view", course.id)}
          course={course}
          label="التقييمات"
        />

        <CourseRatingsList ratings={ratings} />
      </DefaultWrapper>
    </Authenticated>
  );
}
