import { getBranchesAction } from "@/lib/actions/branch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BranchList from "./branch-list";
import Image from "next/image";
import { LuMonitorX } from "react-icons/lu";
import { BranchListResponse } from "@/types";

// interface Branch {
//   user_id: string;
//   user_name: string;
//   branch_id: string;
//   branch_name: string;
//   sia_name: string;
//   sipa_name: string;
//   phone: string;
// }

// interface ApiResponse {
//   status: string;
//   message: string;
//   data: Branch[];
// }

export default async function SelectBranchPage() {
  const cookieSelectBranch = await cookies();
  const jwtTokenLogin = cookieSelectBranch.get("jwtTokenLogin")?.value;
  const jwtTokenSetBranch = cookieSelectBranch.get("jwtTokenSetBranch")?.value;

  if (jwtTokenSetBranch) {
    redirect("/");
  }

  if (!jwtTokenLogin) {
    redirect("/auth/login");
  }

  const result = await getBranchesAction();
  if (!result.success) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>{result.message}</p>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  const branches = (result.data as BranchListResponse).data;

  return (
    <div className="h-dvh w-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="w-full h-dvh flex-col justify-center items-center hidden md:flex">
          <div className="absolute mt-4 top-4 left-6">
            <Image
              src="/images/logo-vimedika.png"
              alt="Vimedika Logo"
              width={168}
              height={51}
              className="object-contain"
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-10">
            <div className="w-full flex items-center justify-center">
              <Image
                src="/images/branch-logo.png"
                alt="Welcome Logo"
                width={581}
                height={402}
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="bg-primary flex flex-col items-center justify-center px-6 relative">
          <div className="max-w-[24em] w-full">
            <div className="relative w-40 h-12 mb-8 md:hidden">
              <Image
                src="/images/logo-vimedika.png"
                alt="Logo Vimedika"
                fill
                sizes="(max-width: 768px) 100vw, 40rem"
                className="object-contain"
              />
            </div>
            {branches && branches.length > 0 ? (
              <>
                <h2 className="text-center leading-relaxed mb-3 text-2xl md:text-3xl text-white font-bold">
                  Pilih Cabang
                </h2>
                <p className="text-white text-center mb-8 font-medium">
                  Silakan pilih cabang untuk melanjutkan
                </p>
                <BranchList branches={branches} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-md">
                <LuMonitorX className="w-16 h-16 text-primary flex items-center justify-center" />
                <p className="text-gray-500 text-center">
                  Saat ini tidak ada cabang yang tersedia untuk dipilih. Silakan
                  hubungi administrator Anda untuk mendapatkan bantuan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
