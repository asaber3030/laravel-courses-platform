import { cn } from "@/lib/utils";

export default function ApplicationLogo({ className }: { className?: string }) {
  return <img src="/logo.svg" className={cn("size-20", className)} />;
}
