import { Course } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "../ui/button";
import { Cog, Eye, MoreHorizontal, Trash } from "lucide-react";

import CourseActionsDropdown from "./course-actions-dropdown";
import DeleteCourseModal from "./delete-course-modal";
import { useTeacher } from "@/hooks/useTeacher";

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
          <Link
            href={route("courses.ratings.view", course.id)}
            className="text-gray-500 hover:underline hover:text-blue-600"
          >
            <strong>{course.ratings_count}</strong> من التقييمات
          </Link>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 flex justify-between">
            عدد الاشتراكات
            <Link
              href={route("courses.subscriptions.view", course.id)}
              className="hover:underline hover:text-blue-600"
            >
              <bdi>{course?.subscriptions_count ?? "ddd"} مشترك</bdi>
            </Link>
          </p>
          <p className="text-gray-600 flex justify-between">
            اخر تعديل
            <bdi>{course.updated_at.toString()}</bdi>
          </p>
          <p className="text-gray-600 flex justify-between">
            تم الانشاء
            <bdi>{course.created_at.toString()}</bdi>
          </p>
        </div>
      </CardContent>
      <Separator className="my-2" />

      <CardFooter className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-3 gap-2">
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
      </CardFooter>
    </Card>
  );
}
