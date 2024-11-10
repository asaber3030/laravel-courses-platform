import DefaultWrapper from "@/components/common/wrapper";
import Authenticated from "@/layouts/authenticated-layout";
import { DashboardPageProps } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { BookIcon, FileIcon, PlayIcon, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const props = usePage<DashboardPageProps>().props;

  console.log({ props });

  return (
    <Authenticated
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          الصفحة الرئيسية
        </h2>
      }
    >
      <Head title="الصفحة الرئيسية" />

      <DefaultWrapper>
        <section className="grid grid-cols-4 gap-4">
          <div className="flex gap-4 bg-white p-4 rounded-md shadow-sm border">
            <ShieldCheck className="size-6 text-primary" />
            <div className="">
              <p className="text-lg font-semibold">الاشتراكات</p>
              <bdi className="text-sm text-gray-600">
                {props.total_subscriptions}
              </bdi>
            </div>
          </div>

          <Link
            className="flex gap-4 bg-white p-4 rounded-md shadow-sm border transition-colors hover:border-primary"
            href={route("courses.list")}
          >
            <PlayIcon className="size-6 text-primary" />
            <div className="">
              <p className="text-lg font-semibold">الكورسات</p>
              <bdi className="text-sm text-gray-600">{props.total_courses}</bdi>
            </div>
          </Link>

          <div className="flex gap-4 bg-white p-4 rounded-md shadow-sm border">
            <BookIcon className="size-6 text-primary" />
            <div className="">
              <p className="text-lg font-semibold">المحاضرات</p>
              <bdi className="text-sm text-gray-600">
                {props.total_lectures}
              </bdi>
            </div>
          </div>

          <div className="flex gap-4 bg-white p-4 rounded-md shadow-sm border">
            <FileIcon className="size-6 text-primary" />
            <div className="">
              <p className="text-lg font-semibold">اجمالي حجم الملفات</p>
              <bdi className="text-sm text-gray-600">
                {props.total_file_size} MB
              </bdi>
            </div>
          </div>
        </section>
      </DefaultWrapper>
    </Authenticated>
  );
}
