import { FullLecture } from "@/types";
import { SingleLecture } from "./lecture";
import { EmptyState } from "@/components/common/empty-state";

type Props = {
  lectures: FullLecture[];
};

export function LecturesList({ lectures }: Props) {
  if (lectures.length === 0)
    return <EmptyState title="لا يوجد محاضرات في هذا الكورس" />;

  return (
    <div>
      {lectures.map((lecture) => (
        <SingleLecture key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
}
