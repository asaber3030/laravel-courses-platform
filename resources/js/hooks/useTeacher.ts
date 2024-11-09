import { usePage } from "@inertiajs/react";

export function useTeacher() {
  const auth = usePage().props.auth;
  return auth.teacher;
}
