import { Course } from "@/types";

import CourseCard from "./course-card";

type Props = {
  courses: Course[];
};

export default function ListCourses({ courses }: Props) {
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
      {courses.map((course) => (
        <CourseCard course={course} key={`course-item-${course.id}`} />
      ))}
    </div>
  );
}
