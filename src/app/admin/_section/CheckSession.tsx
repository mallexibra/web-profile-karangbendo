"use client";
import { useSession } from "next-auth/react";

const CheckSession = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          Anda tidak memiliki akses
        </div>
      </div>
    );
  }

  return null;
};

export default CheckSession;