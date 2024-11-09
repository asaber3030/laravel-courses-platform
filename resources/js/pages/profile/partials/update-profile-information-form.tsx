import InputError from "@/components/common/input-error";
import InputLabel from "@/components/common/input-label";
import TextInput from "@/components/common/text-input";
import { Button } from "@/components/ui/button";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const teacher = usePage().props.auth.teacher;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: teacher.name,
      email: teacher.email,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">المعلومات الشخصية</h2>

        <p className="mt-1 text-sm text-gray-600">
          قم بتحديث معلومات حسابك وعنوان بريدك الإلكتروني.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div>
          <InputLabel htmlFor="name" value="الاسم" />

          <TextInput
            id="name"
            className="mt-1 block w-full"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
            isFocused
            autoComplete="name"
          />

          <InputError className="mt-2" message={errors.name} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="البريد الالكتروني" />

          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            required
            autoComplete="username"
          />

          <InputError className="mt-2" message={errors.email} />
        </div>

        {mustVerifyEmail && teacher.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              بريدك الإلكتروني لم يتم التحقق منه بعد.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                اضغط هنا لإعادة إرسال رابط التحقق
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 text-sm font-medium text-green-600">
                تم إرسال رابط التحقق إلى بريدك الإلكتروني
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button disabled={processing}>حفظ</Button>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">تم الحفظ.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
