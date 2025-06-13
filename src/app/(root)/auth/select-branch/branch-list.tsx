"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBranchAction } from "@/lib/actions/branch";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { LuStore } from "react-icons/lu";
import {
  capitalizeFirstLetter,
  formatPhoneNumber,
} from "@/utils/word-formatter";
import { BranchListProps } from "@/types";

export default function BranchList({ branches }: BranchListProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSelectBranch = (branchId: string) => {
    setError("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("branch_id", branchId);
      const result = await setBranchAction(formData);

      if (result.success) {
        router.push("/");
        router.refresh(); // Penting: untuk me-refresh Server Component dan middleware
      } else {
        setError(result.message || "Failed to set branch.");
      }
    });
  };

  return (
    <div className="grid gap-4 md:grid-row-2 lg:grid-row-3">
      {branches.map((branch) => (
        <Card
          key={branch.branch_id}
          className="hover:shadow-lg hover:ring hover:ring-white hover:ring-offset-2 transition-shadow border-primary bg-white rounded-lg p-2 cursor-pointer flex min-w-fit"
          onClick={() => handleSelectBranch(branch.branch_id)}
        >
          <CardContent className="flex items-center space-x-4 p-2 w-full">
            <LuStore className="w-20 h-20 p-3 text-primary" />
            <div className="flex-1">
              <CardTitle className="text-md font-semibold">
                {capitalizeFirstLetter(branch.branch_name)}
              </CardTitle>
              <CardDescription className="text-sm flex flex-nowrap truncate">
                SIA: {branch.sia_name} | SIPA: {branch.sipa_name}
              </CardDescription>
              <CardDescription className="text-sm">
                {formatPhoneNumber(branch.phone)}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    // <div>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   <ul style={{ listStyle: "none", padding: 0 }}>
    //     {branches.map((branch) => (
    //       <li
    //         key={branch.branch_id}
    //         style={{
    //           marginBottom: "10px",
    //           padding: "10px",
    //           border: "1px solid #eee",
    //           borderRadius: "5px",
    //         }}
    //       >
    //         <p>
    //           <strong>{branch.branch_name}</strong>
    //         </p>
    //         <p>
    //           SIA: {branch.sia_name}, SIPA: {branch.sipa_name}
    //         </p>
    //         <p>Phone: {branch.phone}</p>
    //         <button
    //           onClick={() => handleSelectBranch(branch.branch_id)}
    //           disabled={isPending}
    //           style={{
    //             padding: "8px 12px",
    //             backgroundColor: "#28a745",
    //             color: "white",
    //             border: "none",
    //             borderRadius: "4px",
    //             cursor: isPending ? "not-allowed" : "pointer",
    //           }}
    //         >
    //           {isPending ? "Selecting..." : "Select Branch"}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
