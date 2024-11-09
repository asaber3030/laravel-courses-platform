import { cn } from "@/lib/utils";
import { InertiaLinkProps, Link } from "@inertiajs/react";

export default function NavLink({
  active = false,
  className = "",
  children,
  ...props
}: InertiaLinkProps & { active: boolean }) {
  return (
    <Link
      {...props}
      className={cn(
        "p-2 rounded-md hover:bg-gray-100 transition-colors duration-150 text-sm font-medium",
        active && "bg-gray-100 text-indigo-500",
        className
      )}
    >
      {children}
    </Link>
  );
}
