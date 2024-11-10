import { FullSubscription } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { router } from "@inertiajs/react";

type Props = {
  subscription: FullSubscription;
};

export const TriggerSubscriptionStatusModal = ({ subscription }: Props) => {
  const [open, setOpen] = useState(false);

  const handleTrigger = () => {
    router.post(
      route("courses.subscriptions.trigger", [
        subscription.course_id,
        subscription.id,
      ])
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={subscription.status === "active" ? "outlineWar" : "blue"}
        >
          {subscription.status === "active"
            ? "ايقاف الاشتراك"
            : "تفعيل الاشتراك"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-right flex items-center gap-2">
            تغيير حالة الاشتراك الى <ArrowLeft className="size-4" />
            {subscription.status === "active" ? "Inactive" : "Active"}
          </DialogTitle>
          <DialogDescription>
            عند القيام بتأكيد هذا الفعل المستخدم لن يعد يستطيع ان يرى الكورس مرة
            اخرى حتى تقوم بعكس الفعل
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <Button
            onClick={handleTrigger}
            variant={subscription.status === "active" ? "outlineWar" : "blue"}
          >
            {subscription.status === "active"
              ? "ايقاف الاشتراك"
              : "تفعيل الاشتراك"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">اغلاق</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
