import { Button } from "@/components/ui/button";
import { LectureItem } from "@/types";
import { LectureTypeIcon } from "./lecture-type-icon";
import { Link, router } from "@inertiajs/react";
import { LinkBtn } from "@/components/common/link-btn";
import DeleteLectureItemModal from "./delete-lecture-item-modal";

type Props = {
  item: LectureItem;
  index: number;
  courseId: number;
};

export const SingleLectureItem = ({ courseId, item, index }: Props) => {
  const handleRoute = (segment: "update.view" | "view") => {
    router.visit(
      route(`courses.lectures.items.${segment}`, [
        courseId,
        item.lecture_id,
        item.id,
      ])
    );
  };

  return (
    <div className="flex gap-2 items-center justify-between">
      <section className="flex items-center gap-8 w-full">
        <Link className="flex gap-2 items-center hover:underline" href={""}>
          <p>{index + 1}.</p>
          <LectureTypeIcon type={item.file_type} />
          <p className="font-bold">{item.title}</p>
        </Link>
        <bdi className="text-gray-500 text-sm">{item.file_size}MB</bdi>
      </section>

      <section className="flex gap-2 w-fit">
        <Button onClick={() => handleRoute("view")} variant="ghost">
          عرض
        </Button>
        <Button onClick={() => handleRoute("update.view")} variant="ghost">
          تعديل
        </Button>
        <DeleteLectureItemModal courseId={courseId} item={item} />
      </section>
    </div>
  );
};
