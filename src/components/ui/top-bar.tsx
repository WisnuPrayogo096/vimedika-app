"use client";

import { DollarSign, Moon } from "lucide-react";
import { LuMenu } from "react-icons/lu";

// interface TopBarProps {
//   onToggle: () => void;
// }

// export default function TopBar({ onToggle }: TopBarProps) {
export default function TopBar() {
  return (
    <header className="flex items-center justify-between p-6 bg-transparent text-primary border-2">
      {/* <div className="flex items-center">
        <button
          className="p-2 lg:hidden"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          <LuMenu size={24} />
        </button>
      </div> */}
      <h1 className="text-2xl font-bold ml-4">Cabang Apotek 3</h1>
      <div className="flex flex-row gap-4 items-center text-white">
        <Moon className="w-7 h-7 bg-primary p-0.5 rounded-xl" />
        <DollarSign className="w-7 h-7 bg-primary p-0.5 rounded-xl" />
      </div>
    </header>
  );
}
