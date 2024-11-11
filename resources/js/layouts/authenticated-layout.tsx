import { AppNavbar } from "@/components/navbar/navbar";
import { ToastContainer, TypeOptions } from "react-toastify";

import { AuthenticatedLayoutPageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const { flash } = usePage<AuthenticatedLayoutPageProps>().props;

  useEffect(() => {
    if (flash.message) {
      toast(flash?.message, {
        type: flash?.type as TypeOptions,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: {
          textAlign: "right",
        },
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [flash?.message, flash?.type]);

  return (
    <div className="min-h-screen bg-gray-100">
      <AppNavbar />
      <ToastContainer />
      {header && (
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}
      <main>{children}</main>
    </div>
  );
}
