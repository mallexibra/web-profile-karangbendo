import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="absolute min-h-screen w-full left-0 bottom-0 top-0 right-0 inset-0 z-50 flex justify-center items-center bg-slate-600">
      <div className="text-center max-w-md p-6 border border-gray-300 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Akses Ditolak</h1>
        <p className="text-gray-700 mb-6">
          Anda tidak memiliki akses ke halaman ini. Silakan hubungi
          administrator jika Anda merasa ini adalah kesalahan.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}
