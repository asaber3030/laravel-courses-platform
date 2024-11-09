import { Course } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";
import { Cog, Eye, MoreHorizontal, Trash } from "lucide-react";

import CourseActionsDropdown from "./course-actions-dropdown";
import DeleteCourseModal from "./delete-course-modal";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="p-0">
      <CardHeader className="p-3 mb-0">
        <Link href={route("courses.view", [course.id])}>
          <img
            src={course.image}
            className="rounded-md shadow-sm mb-2 h-[250px] w-full max-w-full object-cover hover:opacity-85 transition-all"
          />
        </Link>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex justify-between items-center">
          <p className="text-green-600 text-xl font-bold">{course.price} ج.م</p>
          <p className="text-gray-500">({course.ratings_count}) التقييمات</p>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 flex justify-between">
            اخر تعديل
            <span>{format(course.updated_at, "yyyy-mm-dd")}</span>
          </p>
          <p className="text-gray-600 flex justify-between">
            تم الانشاء في
            <span>{format(course.created_at, "yyyy-mm-dd")}</span>
          </p>
        </div>
      </CardContent>
      <Separator className="my-2" />

      <CardFooter className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-2">
        <Link href={route("courses.view", [course.id])}>
          <Button icon={Eye} variant="outline" className="w-full">
            عرض
          </Button>
        </Link>

        <Link href={route("courses.update.view", [course.id])}>
          <Button icon={Cog} variant="outline" className="w-full">
            تعديل
          </Button>
        </Link>

        <DeleteCourseModal courseId={course.id} />

        <CourseActionsDropdown course={course}>
          <Button variant="outline" className="w-full" icon={MoreHorizontal} />
        </CourseActionsDropdown>
      </CardFooter>
    </Card>
  );
}
