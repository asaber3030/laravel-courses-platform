import DefaultWrapper from "@/components/common/wrapper";
import Authenticated from "@/layouts/authenticated-layout";

import { Head, router, usePage } from "@inertiajs/react";
import { useSearchParam } from "@/hooks/useSearchParams";
import { useState } from "react";

import { CourseSubscriptionsTable } from "@/components/courses/subscriptions/subscriptions-table";
import { ViewCoursePageProps } from "@/types";
import { ViewCoursePageTitle } from "@/components/courses/page-title";
import { PaginationLinks } from "@/components/common/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ViewCourseSubscriptionsPage() {
  const { course, subscriptions } = usePage<ViewCoursePageProps>().props;
  const searchParam = useSearchParam("search");
  const [search, setSearch] = useState(searchParam || "");

  const handleRemoveSearch = () => {
    setSearch("");
    router.visit(route("courses.subscriptions.view", course.id));
  };

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.visit(
      route("courses.subscriptions.view", course.id) + "?search=" + search
    );
  };

  return (
    <Authenticated>
      <Head title={"الاشتراكات - " + course.title} />

      <DefaultWrapper>
        <ViewCoursePageTitle
          course={course}
          label="الاشتراكات"
          href={route("courses.view", course.id)}
        />

        <form onSubmit={onSubmitSearch} className="my-2 flex gap-2">
          <Input
            placeholder="البحث عن اشتراك..."
            className="bg-white"
            icon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit">بحث</Button>
          {search && (
            <Button variant="outline" onClick={handleRemoveSearch}>
              ازالة البحث
            </Button>
          )}
        </form>

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
