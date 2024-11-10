import { FullSubscription } from "@/types";
import { EmptyState } from "@/components/common/empty-state";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ViewSubscriptionModal } from "./view-subscription-modal";
import { TriggerSubscriptionStatusModal } from "./trigger-status-modal";
import { Link } from "@inertiajs/react";

type Props = {
  subscriptions: FullSubscription[];
};

export const CourseSubscriptionsTable = ({ subscriptions }: Props) => {
  if (subscriptions.length === 0)
    return <EmptyState title="لا يوجد اشتراكات" />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sub ID</TableHead>
          <TableHead>المستخدم</TableHead>
          <TableHead>الكورس</TableHead>
          <TableHead>الحالة</TableHead>
          <TableHead>تم التفعيل في</TableHead>
          <TableHead>حرر</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((subscription) => (
          <TableRow key={`sub-${subscription.id}`}>
            <TableCell className="font-medium" key={subscription.id}>
              {subscription.id}
            </TableCell>
            <TableCell>
              {subscription.user.name} # {subscription.user.id}
            </TableCell>
            <TableCell>
              <Link
                href={route("courses.view", subscription.course_id)}
                className="hover:underline hover:text-blue-600"
              >
                {subscription.course.title}
              </Link>
            </TableCell>
            <TableCell>
              <Badge
                className="capitalize"
                variant={
                  subscription.status === "active" ? "success" : "destructive"
                }
              >
                {subscription.status}
              </Badge>
            </TableCell>
            <TableCell>
              <bdi>{subscription.created_at.toString()}</bdi>
            </TableCell>
            <TableCell className="flex gap-2">
              <ViewSubscriptionModal subscription={subscription} />
              <TriggerSubscriptionStatusModal subscription={subscription} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
