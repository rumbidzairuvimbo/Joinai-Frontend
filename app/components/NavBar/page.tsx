'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

const HeaderNavBar = () => {
  const router = useRouter();
  function Logout(): void {
    router.push("/components/Login/")

    
  }

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
      {/* Title Section */}
      <div className="text-black text-xl font-bold">
        Joina Analytics Dashboard
      </div>

      {/* Button Section */}
      <div>
        <button onClick={Logout} className="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition-all">
          Logout
        </button>
      </div>
    </div>
  );
};

export default HeaderNavBar;
