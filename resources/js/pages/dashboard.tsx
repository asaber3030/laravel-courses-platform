import { useTeacher } from "@/hooks/useTeacher";
import Authenticated from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
  const teacher = useTeacher();
  console.log(teacher);

  return (
    <Authenticated
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard - Dh" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">You're logged in!</div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
