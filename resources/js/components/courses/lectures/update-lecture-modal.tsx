import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "@inertiajs/react";

import { DefaultInput } from "@/components/common/default-input";
import { CourseLecture } from "@/types";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  lecture: CourseLecture;
  children?: React.ReactNode;
};

export default function UpdateLectureModal({ lecture, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, setData, errors, patch, reset } = useForm({
    title: lecture.title,
    order: lecture.order,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    patch(
      route("courses.lectures.update.action", [lecture.course_id, lecture.id]),
      {
        onSuccess: () => {
          setData("title", "");
          setData("order", 1);
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" icon={Edit}>
            تعديل محاضرة
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="mt-4 text-right">
          <DialogTitle className="flex items-center gap-2">
            تعديل المحاضرة
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <DefaultInput
            label="عنوان المحاضرة"
            type="text"
            className="w-full"
            value={data.title}
            id={"title"}
            name={"title"}
            autoComplete={"title"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setData("title", e.target.value)
            }
            error={errors.title}
          />

          <DefaultInput
            label="ترتيب المحاضرة"
            type="number"
            className="w-full"
            value={data.order}
            id={"order"}
            name={"order"}
            autoComplete={"order"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setData("order", Number(e.target.value))
            }
            error={errors.order}
          />

          <DialogFooter className="sm:justify-start flex gap-2 items-center">
            <Button icon={Edit} type="submit" variant="blue">
              تعديل المحاضرة
            </Button>
            <Button
              icon={X}
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              الغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
