import DefaultWrapper from "@/components/common/wrapper";
import Authenticated from "@/layouts/authenticated-layout";

import { CourseSubscriptionsTable } from "@/components/courses/subscriptions/subscriptions-table";
import { ViewCoursePageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";

import { ViewCoursePageTitle } from "@/components/courses/page-title";
import { PaginationLinks } from "@/components/common/pagination";

export default function ViewCourseSubscriptionsPage() {
  const { course, subscriptions } = usePage<ViewCoursePageProps>().props;

  return (
    <Authenticated>
      <Head title={"الاشتراكات - " + course.title} />
      <DefaultWrapper>
        <ViewCoursePageTitle
          course={course}
          label="الاشتراكات"
          href={route("courses.view", course.id)}
        />
        <CourseSubscriptionsTable subscriptions={subscriptions.data} />
        <PaginationLinks
          currentPage={subscriptions.current_page}
          linksLength={subscriptions.links.length - 2}
          nextPageURL={subscriptions.next_page_url}
          prevPageURL={subscriptions.prev_page_url}
          hasNextPage={!!subscriptions.next_page_url}
          hasPrevPage={!!subscriptions.prev_page_url}
        />
      </DefaultWrapper>
    </Authenticated>
  );
}
