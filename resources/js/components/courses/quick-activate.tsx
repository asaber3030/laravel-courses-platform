import { ChangeEvent, FormEvent, useState } from "react";
import { DefaultInput } from "@/components/common/default-input";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  courseId: number;
};

export default function QuickActivateCourse({ courseId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, setData, errors, post } = useForm({
    phone: "",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(route("courses.activate.quick.action", [courseId]));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" icon={ShieldCheck}>
          تفعيل
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="mt-4 text-right">
          <DialogTitle className="flex items-center gap-2">
            تفعيل الكورس لمستخدم عن طريق رقم الهاتف
          </DialogTitle>

          <DialogDescription>
            يمكنك تفعيل الكورس لمستخدم عن طريق ادخال رقم هاتفه
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <DefaultInput
            label="رقم هاتف المستخدم"
            type="text"
            className="w-full"
            value={data.phone}
            id={"phone"}
            name={"phone"}
            autoComplete={"phone"}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setData("phone", e.target.value)
            }
            error={errors.phone}
          />

          <DialogFooter className="sm:justify-start flex gap-2 items-center">
            <Button type="submit" variant="blue">
              تفعيل
            </Button>

            <Button
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
