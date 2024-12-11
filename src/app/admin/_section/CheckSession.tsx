'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const CheckSession = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
      </div>
    );
  }

  if (!session) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: 'Anda tidak memiliki akses',
    });
    return router.push('/auth/login');
  }

  return null;
};

export default CheckSession;
