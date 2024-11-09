import CourseActionsDropdown from "@/components/courses/course-actions-dropdown";
import QuickActivateCourse from "@/components/courses/quick-activate";
import CreateLectureModal from "@/components/courses/lectures/create-lecture-modal";
import DeleteCourseModal from "@/components/courses/delete-course-modal";
import DefaultWrapper from "@/components/common/wrapper";
import Authenticated from "@/layouts/authenticated-layout";

import { CourseSubscriptionsTable } from "@/components/courses/subscriptions/subscriptions-table";
import { ViewCoursePageProps } from "@/types";
import { DollarSign, Edit } from "lucide-react";
import { Head, usePage } from "@inertiajs/react";
import { LecturesList } from "@/components/courses/lectures/lectures-list";
import { PageTitle } from "@/components/common/PageTitle";
import { LinkBtn } from "@/components/common/link-btn";

export default function ViewCoursePage() {
  const { course, lectures, subscriptions } =
    usePage<ViewCoursePageProps>().props;

  const pageTitle = (
    <span>
      كورس - <span className="text-gray-600">{course.title}</span>
    </span>
  );

  return (
    <Authenticated>
      <Head title={"Course - " + course.title} />
      <DefaultWrapper>
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
          <CourseActionsDropdown course={course} />
        </PageTitle>

        <section className="space-y-4">
          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold mb-2">المحاضرات</h2>
              <CreateLectureModal courseId={course.id} />
            </div>
            <LecturesList lectures={lectures} />
          </section>

          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold mb-2">اخر الاشتراكات</h2>
              <div className="flex gap-2 items-center">
                <LinkBtn
                  href={route("courses.subscriptions.view", [course.id])}
                  icon={DollarSign}
                  variant="blue"
                >
                  كل الاشتراكات
                </LinkBtn>
              </div>
            </div>
            <CourseSubscriptionsTable subscriptions={subscriptions} />
          </section>
        </section>
      </DefaultWrapper>
    </Authenticated>
  );
}
