"use client";

import { guestRouter } from "@/const/guest-routes";
import { Menu } from "@/types/menu-type";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Database, Monitor } from "lucide-react";
import TopBar from "@/components/ui/top-bar";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const [show, setShow] = useState<boolean>(true);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const checkingPath = guestRouter.some((path) => pathName.includes(path));
  const [staticMenus, setStaticMenus] = useState<Menu[]>([]);

  if (checkingPath) {
    return (
      <>
        {children}
        <ProgressBar
          height="4px"
          color="#3b82f6"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 bg-gradient-to-b from-primary to-secondary text-white ${
          show ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:w-72`}
      >
        <div className="flex flex-col space-y-4 items-center justify-center mt-4 p-4">
          <h2 className="text-3xl font-bold text-center">Vimedika</h2>
          <div className="w-full space-y-6">
            <div className="flex flex-row p-2 mt-6 bg-secondary rounded-md items-center">
              <Monitor className="w-6 h-6 mr-2" />
              <h2 className="font-medium">Dashboard</h2>
            </div>
            <div className="border-1"></div>
          </div>
        </div>
        <nav>
          <h2 className="text-center font-medium">APLIKASI & HALAMAN</h2>
          <ul className="p-4 space-y-2">
            <div className="p-2 flex flex-row items-center rounded-md ">
              <Database className="w-6 h-6 mr-2" />
              <h2 className="font-medium">Master</h2>
            </div>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        <TopBar />
        {children}
      </div>

      {/* Progress Bar */}
      <ProgressBar
        height="4px"
        color="#3b82f6"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  );
};

export default PanelLayout;
