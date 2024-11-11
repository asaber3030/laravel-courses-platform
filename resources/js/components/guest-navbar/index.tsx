import { useTeacher } from "@/hooks/useTeacher";
import { UserDropdown } from "../navbar/user-dropdown";
import ApplicationLogo from "../common/application-logo";
import { LinkBtn } from "../common/link-btn";
import { LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const teacher = useTeacher();

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {!teacher?.id ? (
          <div className="flex gap-2">
            <LinkBtn href={route("login")} icon={LogIn}>
              تسجيل الدخول
            </LinkBtn>
            <LinkBtn variant="outline" href={route("register")} icon={UserPlus}>
              انشاء حساب جديد
            </LinkBtn>
          </div>
        ) : (
          <div className="space-x-4">
            <UserDropdown />
          </div>
        )}
        <div className="text-2xl font-semibold text-gray-800">
          <ApplicationLogo className="size-8" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
