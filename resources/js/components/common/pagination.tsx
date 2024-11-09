import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Link, router, usePage } from "@inertiajs/react";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";

type Props = {
  currentPage: number;
  linksLength: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPageURL: string;
  prevPageURL: string;
};

export function PaginationLinks({
  currentPage,
  linksLength,
  hasNextPage,
  hasPrevPage,
  nextPageURL,
  prevPageURL,
}: Props) {
  const { url, props } = usePage();

  const searchParams = new URLSearchParams(url.split("?")[1]);
  const page = Number(searchParams.get("yourParamName"));

  return (
    <div className="flex gap-2 items-center py-4">
      <Button
        className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md transition-colors text-sm font-medium"
        disabled={!hasPrevPage}
        onClick={() => router.visit(prevPageURL)}
        variant="outline"
      >
        <DoubleArrowRightIcon className="size-4" />
        السابق
      </Button>

      {Array.from({ length: linksLength }, (_, i) => (
        <Button
          key={`pagination-item-${i}`}
          className={cn(
            "p-2 hover:bg-gray-200 rounded-md transition-colors text-sm font-medium px-4"
          )}
          variant="outline"
          onClick={() => router.visit(`?page=${i + 1}`)}
          disabled={currentPage === i + 1}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md transition-colors text-sm font-medium"
        disabled={!hasNextPage}
        onClick={() => router.visit(nextPageURL)}
        variant="outline"
      >
        التالي
        <DoubleArrowLeftIcon className="size-4" />
      </Button>
    </div>
  );
}
