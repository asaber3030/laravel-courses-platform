import DefaultWrapper from "@/components/common/wrapper";
import UpdateLectureModal from "@/components/courses/lectures/update-lecture-modal";
import Authenticated from "@/layouts/authenticated-layout";
import DeleteLectureModal from "@/components/courses/lectures/delete-lecture-modal";

import { ViewLecturePageProps } from "@/types";
import { SingleLectureItem } from "@/components/courses/lectures/lecture-item";
import { PageTitle } from "@/components/common/PageTitle";

import { Plus, TriangleAlert } from "lucide-react";
import { Head, usePage } from "@inertiajs/react";
import { LinkBtn } from "@/components/common/link-btn";

export default function ViewLecturePage() {
  const { lecture } = usePage<ViewLecturePageProps>().props;

  const createItemURL = route("courses.lectures.items.create.view", [
    lecture.course_id,
    lecture.id,
  ]);

  const pageTitle = (
    <span className="flex items-center gap-2">
      محاضرة -<span>{lecture.title}</span>
    </span>
  );

  return (
    <Authenticated>
      <Head title="Courses" />
      <DefaultWrapper>
        <PageTitle
          title={pageTitle}
          className="flex-col items-center justify-center xl:justify-between xl:flex-row gap-4"
        >
          <UpdateLectureModal lecture={lecture} />
          <DeleteLectureModal lecture={lecture} />
          <LinkBtn href={createItemURL} variant="blue" icon={Plus}>
            اضافة عنصر
          </LinkBtn>
        </PageTitle>

        {lecture.items.length === 0 ? (
          <div className="bg-white px-4 py-2 rounded-md shadow-sm border font-semibold text-gray-500 flex items-center gap-2 mt-4">
            <TriangleAlert className="size-4" />
            لا يوجد.
          </div>
        ) : (
          <section className="mt-4">
            {lecture.items.map((item, idx) => (
              <SingleLectureItem
                key={`single-item-${item.id}`}
                courseId={lecture.course_id}
                item={item}
                index={idx}
              />
            ))}
          </section>
        )}
      </DefaultWrapper>
    </Authenticated>
  );
}
