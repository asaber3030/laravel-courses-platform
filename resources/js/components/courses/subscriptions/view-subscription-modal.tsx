import { FullSubscription } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookOpen, Calendar, Hash, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

import moment from "moment";
import { LinkBtn } from "@/components/common/link-btn";

type Props = {
  subscription: FullSubscription;
};

export const ViewSubscriptionModal = ({ subscription }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">عرض</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-right">
            {subscription.course.title}
          </DialogTitle>
          <DialogDescription>
            هذه الصفحة تعرض معلومات الاشتراك في الكورس.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center flex-row-reverse">
            <Badge
              variant="outline"
              className="justify-self-start col-span-2 capitalize"
            >
              {subscription.status}
            </Badge>
            <div className="col-span-2 flex items-center gap-2 text-r">
              <Calendar className="size-4" />
              <span className="text-sm">
                <bdi>تم الاشتراك:</bdi>{" "}
                <bdi className="font-bold">
                  {moment(subscription.created_at).fromNow()}
                </bdi>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <span className="text-sm">
              المستخدم:{" "}
              <span className="font-bold">
                {subscription.user.name} - {subscription.user.phone}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="size-4" />
            <span className="text-sm">
              رقم الاشتراك:{" "}
              <span className="font-bold">SUB{subscription.id}</span>
            </span>
          </div>
        </div>
        <DialogFooter>
          <LinkBtn
            type="button"
            className="w-full"
            href={route("courses.view", subscription.course.id)}
          >
            <BookOpen className="mr-2 size-4" />
            Go to Course
          </LinkBtn>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
