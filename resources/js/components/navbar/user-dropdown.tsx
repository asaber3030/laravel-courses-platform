import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useTeacher } from "@/hooks/useTeacher";
import { router } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export const UserDropdown = () => {
  const teacher = useTeacher();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" icon={User} className="flex-row-reverse">
          {teacher.email}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel className="text-left">
          {teacher.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.get(route("profile.edit"))}
          className={cn(
            route().current("profile.edit") &&
              "bg-gray-100 text-primary hover:text-primary"
          )}
        >
          حسابي
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
