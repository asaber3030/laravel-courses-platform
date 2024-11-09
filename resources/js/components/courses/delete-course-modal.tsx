import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteCourseModal({ courseId }: { courseId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = () => {
    router.delete(route("courses.delete.action", [courseId]));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          icon={Trash}
          className="text-red-600 hover:text-red-600"
        >
          حذف
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="mt-4">
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            هل انت متأكد من انك تريد حذف هذا الكورس؟
          </DialogTitle>
          <DialogDescription className="text-right">
            حذف الكورس يمكنك استرجاعه مره اخرى من خلال سلة المهملات في حال انك
            اردت ذلك
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start flex gap-2 items-center">
          <Button type="submit" variant="destructive" onClick={onSubmit}>
            هل انت متأكد؟
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            الغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
