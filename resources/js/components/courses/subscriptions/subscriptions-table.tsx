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

import moment from "moment";
import { ViewSubscriptionModal } from "./view-subscription-modal";

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
              SUB{subscription.id}
            </TableCell>
            <TableCell>
              {subscription.user.name} # {subscription.user.id}
            </TableCell>
            <TableCell>{subscription.course.title}</TableCell>
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
              <bdi>{moment(subscription.created_at).fromNow()}</bdi>
            </TableCell>
            <TableCell>
              <ViewSubscriptionModal subscription={subscription} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
