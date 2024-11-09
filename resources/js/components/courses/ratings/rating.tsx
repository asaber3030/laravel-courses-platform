import { FullCourseRating } from "@/types";
import { Star } from "lucide-react";

type Props = {
  rating: FullCourseRating;
};

export default function RatingCard({ rating }: Props) {
  return (
    <div className="space-x-2 py-2 border rounded-md px-4 bg-white shadow-sm">
      <div className="flex gap-2 items-center">
        <h3 className="text-xl font-medium">{rating.user.name}</h3>
        <p className="text-gray-500 text-sm">{rating.user.phone}</p>
      </div>
      <div className="flex gap-2 items-center mt-2">
        {Array.from({ length: rating.rating }).map((_, i) => (
          <span key={`filled-star-${i}`}>
            <Star fill="green" stroke="black" />
          </span>
        ))}
        {Array.from({ length: 5 - rating.rating }).map((_, i) => (
          <span key={`unfilled-star-${i}`}>
            <Star stroke="black" />
          </span>
        ))}
      </div>
    </div>
  );
}
