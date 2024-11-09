import { SingleLectureItem } from "./lecture-item";
import { LinkBtn } from "@/components/common/link-btn";
import { FullLecture } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  lecture: FullLecture;
};

export function SingleLecture({ lecture }: Props) {
  const viewURL = route("courses.lectures.view", [
    lecture.course_id,
    lecture.id,
  ]);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`lecture-${lecture.id}`}>
        <AccordionTrigger className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full">
            <h3>{lecture.title}</h3>
            <div className="flex items-center gap-2">
              <LinkBtn href={viewURL} variant="outline">
                عرض المحاضرة
              </LinkBtn>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-8">
          {lecture.items.length === 0 ? (
            <div className="text-gray-600">لا يوجد.</div>
          ) : (
            <section className="space-y-2 py-2">
              {lecture.items.map((item, idx) => (
                <SingleLectureItem
                  key={`single-item-${item.id}`}
                  item={item}
                  index={idx}
                  courseId={lecture.course_id}
                />
              ))}
            </section>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
