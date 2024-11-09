import { FullCourseRating } from "@/types";
import RatingCard from "./rating";

type Props = {
  ratings: FullCourseRating[];
};

export const CourseRatingsList = ({ ratings }: Props) => {
  return (
    <div className="space-y-2 divide-y">
      {ratings.map((rating) => (
        <RatingCard rating={rating} key={`rating-${rating.id}`} />
      ))}
    </div>
  );
};
