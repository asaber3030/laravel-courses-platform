import FileInput from "@/components/common/file-input";
import DefaultWrapper from "@/components/common/wrapper";
import Authenticated from "@/layouts/authenticated-layout";

import { PageTitle } from "@/components/common/PageTitle";
import { DefaultInput } from "@/components/common/default-input";
import { UpdateLectureItemPageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { GoBack } from "@/components/common/go-back-button";
import { Edit } from "lucide-react";

export default function ViewLecturePage() {
  const { lecture, item } = usePage<UpdateLectureItemPageProps>().props;

  const { data, setData, post, errors } = useForm({
    title: item.title,
    order: item.order,
    file: null,
  });

  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setFile] = useState<undefined | File>(undefined);

  const removeSelectedImage = () => {
    setIsFileSelected(false);
    setFile(undefined);
    setData("file", null);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsFileSelected(true);
      setFile(file);
      setData("file", file as any);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    post(
      route("courses.lectures.items.update.action", [
        lecture.course_id,
        lecture.id,
        item.id,
      ])
    );
  };

  const pageTitle = (
    <span>
      تعديل عنصر - عنصر: <bdi>{item.title}</bdi>
    </span>
  );

  return (
    <Authenticated>
      <Head title="Update Item" />
      <DefaultWrapper>
        <PageTitle title={pageTitle} className="mb-4" />
        <form onSubmit={onSubmit} className="space-y-4">
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

          <FileInput
            name="file"
            onImageChange={onImageChange}
            isFileSelected={isFileSelected}
            selectedFile={selectedFile}
            removeSelectedImage={removeSelectedImage}
            error={errors.file}
          />

          <DefaultInput
            label="الترتيب"
            id="order"
            name="order"
            className="mt-1 block w-full"
            autoComplete="order"
            value={data.order}
            onChange={(e: any) => setData("order", e.target.value)}
            error={errors.order}
          />

          <section className="flex gap-2 mt-2">
            <Button variant="blue" icon={Edit}>
              تعديل العنصر
            </Button>
            <GoBack />
          </section>
        </form>
      </DefaultWrapper>
    </Authenticated>
  );
}
