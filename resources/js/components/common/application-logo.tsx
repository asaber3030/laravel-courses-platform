import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function ApplicationLogo({ className }: { className?: string }) {
  return (
    <Link href={route("home")}>
      <img src="/logo.svg" className={cn("size-20", className)} />
    </Link>
  );
}
