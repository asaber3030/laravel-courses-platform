import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { DefaultInput } from "@/components/common/default-input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateLectureModal({ courseId }: { courseId: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, setData, errors, post } = useForm({
    title: "",
    order: 1,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(route("courses.lectures.create.action", [courseId]), {
      onSuccess: () => {
        setData("title", "");
        setData("order", 1);
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="blue" icon={Plus}>
          اضافة محاضرة
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="mt-4 text-right">
          <DialogTitle className="flex items-center gap-2">
            اضافة محاضرة جديده
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
            <Button icon={Plus} type="submit" variant="blue">
              اضافة المحاضرة
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
