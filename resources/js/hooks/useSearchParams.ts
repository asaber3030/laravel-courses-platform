import { usePage } from "@inertiajs/react";

export function useSearchParam(param: string) {
  const { url } = usePage();
  const searchParams = new URLSearchParams(url.split("?")[1]);
  return searchParams.get(param);
}
