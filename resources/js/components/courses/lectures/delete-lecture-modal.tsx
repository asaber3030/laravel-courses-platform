import { useState } from "react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { CourseLecture } from "@/types";

type Props = {
  lecture: CourseLecture;
  children?: React.ReactNode;
};

export default function DeleteLectureModal({ lecture, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { post } = useForm();

  const handleSubmit = () => {
    post(
      route("courses.lectures.delete.action", [lecture.course_id, lecture.id])
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outlineDes" icon={Trash}>
            حذف المحاضرة
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="mt-4 text-right">
          <DialogTitle className="flex items-center gap-2">
            حذف المحاضرة
          </DialogTitle>
          <DialogDescription>
            هل انت متأكد من حذف المحاضرة؟ يمكنك استرجاعها في اي وقت.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start flex gap-2 items-center">
          <Button icon={Trash} variant="destructive" onClick={handleSubmit}>
            حذف المحاضرة
          </Button>
          <Button icon={X} variant="outline" onClick={() => setIsOpen(false)}>
            الغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
