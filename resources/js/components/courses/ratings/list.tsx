import { FullCourseRating } from "@/types";
import RatingCard from "./rating";
import { EmptyState } from "@/components/common/empty-state";

type Props = {
  ratings: FullCourseRating[];
};

export const CourseRatingsList = ({ ratings }: Props) => {
  if (ratings.length === 0) return <EmptyState title="لا يوجد تقييمات" />;

  return (
    <div className="space-y-2 divide-y">
      {ratings.map((rating) => (
        <RatingCard rating={rating} key={`rating-${rating.id}`} />
      ))}
    </div>
  );
};
