import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import React from "react";
import InputLabel from "./input-label";
import InputError from "./input-error";

type Props = {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeSelectedImage: () => void;
  isFileSelected: boolean;
  selectedFile?: File;
  name: string;
  error?: string;
  label?: string;
};

export default function FileInput({
  selectedFile,
  isFileSelected,
  removeSelectedImage,
  name,
  error,
  label = "الملف",
  onImageChange,
}: Props) {
  return (
    <div>
      <InputLabel className="mb-1">{label}</InputLabel>
      <div
        className={cn(
          "flex items-center gap-2 relative hover:border-indigo-600 transition-colors bg-white py-2 px-4 rounded-md shadow-sm font-medium cursor-pointer border",
          isFileSelected && "border border-indigo-600"
        )}
      >
        <FileIcon className="size-4" />
        <bdi>{isFileSelected ? selectedFile?.name : "اضافة صورة للمحتوى"} </bdi>
        <input
          id="image"
          name={name}
          type="file"
          className="mt-1 block opacity-0 absolute w-full h-full left-0 top-0"
          autoComplete={name}
          onChange={onImageChange}
        />
      </div>
      <InputError message={error} />
      {isFileSelected && (
        <div
          onClick={removeSelectedImage}
          className="cursor-pointer font-medium select-none text-yellow-600 hover:text-yellow-700"
        >
          ازالة الصورة
        </div>
      )}
    </div>
  );
}
