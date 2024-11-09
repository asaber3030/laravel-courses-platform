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

export const UserDropdown = () => {
  const teacher = useTeacher();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{teacher.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
