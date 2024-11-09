import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export const GoBack = () => {
  return (
    <Button
      type="button"
      onClick={() => window.history.go(-1)}
      variant="outline"
    >
      الرجوع
      <DoubleArrowLeftIcon className="size-3" />
    </Button>
  );
};
