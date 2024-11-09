import { ClassValue } from "clsx";
import InputError from "./input-error";
import InputLabel from "./input-label";
import TextInput from "./text-input";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

type Props = {
  value: string | number | null;
  type?: string;
  id: string;
  name: string;
  className: ClassValue;
  autoComplete: string;
  onChange: any;
  label: string;
  error: string | undefined;
  isTextarea?: boolean;
  showLabel?: boolean;
};

export const DefaultInput = ({
  showLabel = true,
  value,
  id,
  type = "text",
  isTextarea = false,
  name,
  className,
  autoComplete,
  onChange,
  label,
  error,
}: Props) => {
  return (
    <div className="mt-4">
      {showLabel && <InputLabel htmlFor={id} value={label} />}
      {isTextarea ? (
        <Textarea
          id={id}
          onChange={onChange}
          name={name}
          autoComplete={autoComplete}
          className="mt-1 block w-full"
          defaultValue={value as any}
          value={value as any}
        />
      ) : (
        <TextInput
          id={id}
          type={type}
          name={name}
          value={value as any}
          className={cn("mt-1 block w-full", className)}
          autoComplete={autoComplete}
          onChange={onChange}
        />
      )}
      <InputError message={error} className="mt-2" />
    </div>
  );
};
