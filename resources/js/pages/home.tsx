import Navbar from "@/components/guest-navbar";

import { LinkBtn } from "@/components/common/link-btn";
import { Home, LogIn, UserPlus } from "lucide-react";
import { useTeacher } from "@/hooks/useTeacher";

const App = () => {
  const teacher = useTeacher();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <section className="bg-cover bg-center h-screen flex items-center bg-[url('./home-bg.jpg')] relative z-10 bg-fixed">
        <div className="bg-opacity-60 bg-black w-full h-full absolute left-0 top-0 -z-10"></div>
        <div className="p-8 rounded-lg text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            تعلم مهارات جديدة وتطوير مسارك المهني مع منصتنا
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            انضم الينا اليوم واحصل على فرصة للوصول الى مكتبة ضخمة من الدورات
            التعليمية عبر الانترنت.
          </p>
          {!teacher?.id ? (
            <div className="flex gap-2">
              <LinkBtn href={route("login")} icon={LogIn}>
                تسجيل الدخول
              </LinkBtn>
              <LinkBtn
                href={route("register")}
                icon={UserPlus}
                variant="secondary"
              >
                انشاء حساب جديد
              </LinkBtn>
            </div>
          ) : (
            <LinkBtn href={route("dashboard")} icon={Home}>
              الصفحة الرئيسية
            </LinkBtn>
          )}
        </div>
      </section>

      <section className="py-16 bg-white px-4">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            لماذا تختارنا؟
          </h2>
          <p className="text-gray-600 mt-4">
            منصتنا تقدم ميزات متميزة لتعزيز تجربة التعلم الخاصة بك.
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <div className="text-5xl text-blue-500 mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">محتوى عالي الجودة</h3>
            <p className="text-gray-600">
              دوراتنا مصممة بواسطة خبراء لضمان تجربة تعلم ذات جودة عالية.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <div className="text-5xl text-green-500 mb-4">⏰</div>
            <h3 className="text-xl font-semibold mb-2">مرونة في التعلم</h3>
            <p className="text-gray-600">
              تعلم وفق جدولك الخاص، في أي وقت ومن أي مكان.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <div className="text-5xl text-yellow-500 mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">أسعار مناسبة</h3>
            <p className="text-gray-600">
              احصل على دورات عالية الجودة دون إنفاق كبير.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <div className="text-5xl text-red-500 mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold mb-2">مدربون خبراء</h3>
            <p className="text-gray-600">
              تعلم من محترفين في المجال ومدربين ذوي خبرة.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <div className="text-5xl text-indigo-500 mb-4">📜</div>
            <h3 className="text-xl font-semibold mb-2">شهادات معتمدة</h3>
            <p className="text-gray-600">
              احصل على شهادات لتعزيز مسارك المهني وعرض إنجازاتك.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <div className="text-5xl text-purple-500 mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-2">دعم المجتمع</h3>
            <p className="text-gray-600">
              انضم إلى مجتمع من المتعلمين واحصل على دعم من الزملاء والمدربين.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg mb-4">
            Our mission is to empower individuals by providing high-quality,
            accessible online education.
          </p>
          <p className="mt-6">
            © 2024{" "}
            <a
              className="underline hover:text-blue-500"
              href="https://asaber.vercel.app"
              target="_blank"
            >
              Abdulrahman Saber
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
