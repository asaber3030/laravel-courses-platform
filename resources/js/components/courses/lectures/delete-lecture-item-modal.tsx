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
import { LectureItem } from "@/types";

type Props = {
  children?: React.ReactNode;
  courseId: number;
  item: LectureItem;
};

export default function DeleteLectureItemModal({
  courseId,
  item,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { post } = useForm();

  const handleSubmit = () => {
    post(
      route("courses.lectures.items.delete.action", [
        courseId,
        item.lecture_id,
        item.id,
      ])
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? children : <Button variant="ghostDes">حذف</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="mt-4 text-right">
          <DialogTitle className="flex items-center gap-2">
            حذف العنصر
          </DialogTitle>
          <DialogDescription>
            هل انت متأكد من حذف العنصر؟ يمكنك استرجاعه في اي وقت.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start flex gap-2 items-center">
          <Button icon={Trash} variant="destructive" onClick={handleSubmit}>
            حذف العنصر
          </Button>
          <Button icon={X} variant="outline" onClick={() => setIsOpen(false)}>
            الغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
