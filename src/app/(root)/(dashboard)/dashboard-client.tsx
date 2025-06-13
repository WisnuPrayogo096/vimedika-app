"use client";

import LogoutButton from "./logout-button";

interface DashboardClientProps {
  profileData: any;
}

export default function DashboardClient({ profileData }: DashboardClientProps) {
  return (
    <div className="container mx-auto">
      <LogoutButton />
      {/* Profile Section */}
      {/* <div className="p-5 max-w-2xl mx-auto my-12 border border-gray-300 rounded-lg bg-white bg-opacity-90 shadow-md">
        <h1 className="text-2xl font-bold text-primary">
          Welcome to the Dashboard!
        </h1>
        <div className="mt-4">
        </div>
        <h2 className="text-xl font-semibold text-secondary mt-6">
          Your Profile:
        </h2>
        {profileData ? (
          <pre className="mt-2 p-4 bg-gray-100 rounded-md text-sm text-gray-800 overflow-x-auto">
            {JSON.stringify(profileData, null, 2)}
          </pre>
        ) : (
          <p className="mt-2 text-gray-600">No profile data available.</p>
        )}
      </div> */}

    </div>
  );
}
