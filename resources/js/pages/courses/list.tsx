import DefaultWrapper from "@/components/common/wrapper";
import ListCourses from "@/components/courses/list-courses";
import Authenticated from "@/layouts/authenticated-layout";

import { useState } from "react";

import { Plus, Search } from "lucide-react";
import { LinkBtn } from "@/components/common/link-btn";
import { PageTitle } from "@/components/common/PageTitle";
import { CoursesPageProps } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { PaginationLinks } from "@/components/common/pagination";
import { EmptyState } from "@/components/common/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParam } from "@/hooks/useSearchParams";

export default function ListCoursesPage() {
  const { courses } = usePage<CoursesPageProps>().props;

  const searchParam = useSearchParam("search");

  const [search, setSearch] = useState(searchParam || "");

  const handleRemoveSearch = () => {
    setSearch("");
    router.visit(route("courses.list"));
  };

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.visit(route("courses.list") + "?search=" + search);
  };

  return (
    <Authenticated>
      <Head title="Courses" />
      <DefaultWrapper>
        <PageTitle title="الكورسات الخاصة بي" className="mb-4">
          <LinkBtn icon={Plus} href={route("courses.create.view")}>
            اضافة كورس
          </LinkBtn>
        </PageTitle>

        <form onSubmit={onSubmitSearch} className="my-2 flex gap-2">
          <Input
            placeholder="البحث عن كورس..."
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

        {courses.data.length > 0 ? (
          <div className="space-y-2">
            <ListCourses courses={courses.data} />
            <div className="mt-4">
              <PaginationLinks
                hasNextPage={!!courses.next_page_url}
                hasPrevPage={!!courses.prev_page_url}
                prevPageURL={courses.prev_page_url}
                nextPageURL={courses.next_page_url}
                linksLength={courses.links.length - 2}
                currentPage={courses.current_page}
              />
            </div>
          </div>
        ) : (
          <EmptyState className="my-4" title="لا يوجد كورسات" />
        )}
      </DefaultWrapper>
    </Authenticated>
  );
}
