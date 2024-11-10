import { PageTitle } from "@/components/common/PageTitle";
import { EmptyState } from "@/components/common/empty-state";
import { PaginationLinks } from "@/components/common/pagination";
import DefaultWrapper from "@/components/common/wrapper";
import { CourseSubscriptionsTable } from "@/components/courses/subscriptions/subscriptions-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/hooks/useSearchParams";
import Authenticated from "@/layouts/authenticated-layout";
import { SubscriptionsPageProps } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
  BookIcon,
  FileIcon,
  PlayIcon,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { subscriptions } = usePage<SubscriptionsPageProps>().props;
  const searchParam = useSearchParam("search");

  const [search, setSearch] = useState(searchParam || "");

  const handleRemoveSearch = () => {
    setSearch("");
    router.visit(route("subscriptions"));
  };

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.visit(route("subscriptions") + "?search=" + search);
  };

  return (
    <Authenticated>
      <Head title="الاشتراكات" />

      <DefaultWrapper>
        <PageTitle title="الاشتراكات" />
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
        {subscriptions.data.length > 0 ? (
          <div className="space-y-2">
            <CourseSubscriptionsTable subscriptions={subscriptions.data} />

            <div className="mt-4">
              <PaginationLinks
                hasNextPage={!!subscriptions.next_page_url}
                hasPrevPage={!!subscriptions.prev_page_url}
                prevPageURL={subscriptions.prev_page_url}
                nextPageURL={subscriptions.next_page_url}
                linksLength={subscriptions.links.length - 2}
                currentPage={subscriptions.current_page}
              />
            </div>
          </div>
        ) : (
          <EmptyState className="my-4" title="لا يوجد اشتراكات" />
        )}
      </DefaultWrapper>
    </Authenticated>
  );
}
