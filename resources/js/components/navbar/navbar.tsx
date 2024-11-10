import ApplicationLogo from "../common/application-logo";
import NavLink from "./navlink";

import { useTeacher } from "@/hooks/useTeacher";
import { UserDropdown } from "./user-dropdown";

export const AppNavbar = () => {
  return (
    <div className="bg-white border-b">
      <nav className="py-6 flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-10 items-center">
          <ApplicationLogo className="size-8" />

          <ul className="flex gap-2 items-center">
            <li>
              <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
              >
                الصفحة الرئيسية
              </NavLink>
            </li>

            <li>
              <NavLink
                href={route("courses.list")}
                active={route().current("courses.list")}
              >
                الكورسات
              </NavLink>
            </li>
          </ul>
        </div>

        <UserDropdown />
      </nav>
    </div>
  );
};
