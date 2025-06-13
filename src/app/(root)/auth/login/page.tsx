import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import LoginForm from "./form";
import Image from "next/image";
import { Suspense } from "react";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Sign In | Vimedika",
  description:
    "Masuk ke akun Vimedika Anda untuk mengakses sistem manajemen medis",
  robots: "noindex, nofollow",
};

async function checkAuthentication() {
  try {
    const cookieStore = await cookies();
    const jwtTokenSetBranch = cookieStore.get("jwtTokenSetBranch")?.value;

    if (jwtTokenSetBranch) {
      const tokenParts = jwtTokenSetBranch.split(".");
      if (tokenParts.length === 3) {
        redirect("/");
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

export default async function LoginPage() {
  await checkAuthentication();

  return (
    <div className="h-dvh w-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="w-full h-dvh flex-col justify-center items-center hidden md:flex bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="w-full flex flex-col items-center justify-center space-y-10 px-8">
            <header>
              <h1 className="text-primary text-center space-y-2 py-10 font-bold text-xl md:text-3xl xl:text-4xl">
                <span className="block">Selamat Datang di Vimedika!</span>
              </h1>
            </header>
            <div className="w-full flex items-center justify-center">
              <div className="relative w-[554px] h-[393px] max-w-full">
                <Image
                  src="/images/login-logo.png"
                  alt="Vimedika - Sistem Manajemen Medis"
                  fill
                  sizes="(max-width: 768px) 100vw, 554px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary flex flex-col items-center justify-center px-6 relative">
          <div className="max-w-[24em] w-full">
            <div className="relative w-full h-16 mb-8 md:hidden flex items-center justify-center">
              <Image
                src="/images/logo-vimedika.png"
                alt="Logo Vimedika"
                fill
                sizes="(max-width: 768px) 100vw, 24rem"
                className="object-contain"
              />
            </div>

            <header className="text-center mb-8">
              <h2 className="leading-relaxed mb-3 text-2xl md:text-3xl text-white font-bold">
                Sign In
              </h2>
              <p className="text-white/90 font-medium text-sm md:text-base">
                Masuk ke akun anda untuk melanjutkan
              </p>
            </header>

            <main>
              <Suspense
                fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-12 bg-white/20 rounded"></div>
                  </div>
                }
              >
                <LoginForm />
              </Suspense>
            </main>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
