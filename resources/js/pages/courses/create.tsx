import Authenticated from "@/layouts/authenticated-layout";
import DefaultWrapper from "@/components/common/wrapper";
import InputError from "@/components/common/input-error";

import { cn } from "@/lib/utils";
import { Head, router, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { PageTitle } from "@/components/common/PageTitle";
import { DefaultInput } from "@/components/common/default-input";
import { GoBack } from "@/components/common/go-back-button";
import { Button } from "@/components/ui/button";
import { FileIcon, Plus } from "lucide-react";

export default function CreateCoursePage() {
  const { data, setData, errors } = useForm({
    title: "",
    description: "",
    price: 0,
    image: null,
  });

  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setFile] = useState<undefined | File>(undefined);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsFileSelected(true);
      setFile(file);
    }
    setData("image", file as any);
  };

  const removeSelectedImage = () => {
    setIsFileSelected(false);
    setFile(undefined);
    setData("image", null);
  };

  const onSubmit: FormEventHandler = (e) => {
    console.log(errors);
    e.preventDefault();
    router.post(route("courses.create.action"), data, {
      forceFormData: true,
    });
  };

  return (
    <Authenticated>
      <Head title="Courses" />

      <DefaultWrapper>
        <PageTitle title="اضافة كورس جديد" className="mb-4"></PageTitle>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <div
              className={cn(
                "flex items-center gap-2 relative bg-white py-2 px-4 rounded-md shadow-sm font-medium cursor-pointer border",
                isFileSelected && "border border-indigo-600"
              )}
            >
              <FileIcon className="size-4" />
              <span>
                {isFileSelected ? selectedFile?.name : "اضافة صورة للمحتوى"}{" "}
              </span>
              <input
                id="image"
                name="image"
                type="file"
                className="mt-1 block opacity-0 absolute w-full h-full left-0 top-0"
                autoComplete="image"
                onChange={onImageChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <InputError message={errors?.image} />
              {isFileSelected && (
                <div
                  onClick={removeSelectedImage}
                  className="cursor-pointer font-medium select-none text-yellow-600 hover:text-yellow-700"
                >
                  ازالة الصورة
                </div>
              )}
            </div>
          </div>

          <DefaultInput
            label="العنوان"
            id="title"
            name="title"
            className="mt-1 block w-full"
            autoComplete="title"
            value={data.title}
            onChange={(e: any) => setData("title", e.target.value)}
            error={errors.title}
          />

          <DefaultInput
            label="الوصف"
            id="description"
            name="description"
            className="mt-1 block w-full resize-none"
            autoComplete="description"
            value={data.description}
            onChange={(e: any) => setData("description", e.target.value)}
            error={errors.description}
            isTextarea
          />
          <DefaultInput
            label="السعر"
            id="price"
            name="price"
            className="mt-1 block w-full"
            autoComplete="price"
            value={data.price}
            onChange={(e: any) => setData("price", e.target.value)}
            error={errors.price}
          />

          <div className="flex gap-2">
            <Button icon={Plus} type="submit">
              اضافة الكورس
            </Button>
            <GoBack />
          </div>
        </form>
      </DefaultWrapper>
    </Authenticated>
  );
}
