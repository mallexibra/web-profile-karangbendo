'use client';
import Button from '@/components/button/Button';
import { InputForm } from '@/components/forms/InputForm';
import LabelForm from '@/components/forms/LabelForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingBar from '@/components/loading/LoadingBar';

export default function Login() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email tidak valid')
      .required('Email wajib diisi'),
    password: yup
      .string()
      .min(8, 'Password minimal 8 karakter')
      .required('Password wajib diisi'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: any) => {
    setIsLoading(true);

    try {
      const response: any = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      const session = await getSession();

      if (response?.error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Email/Password Anda Salah!',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Sukses!',
          text: 'Anda sukses login',
        });

        if (session?.user?.role === 'umkm') {
          console.log(session?.user);
          const haveShhop = session?.user?.shop?.length ?? 0 > 0;
          if(!haveShhop){
            Swal.fire({
              icon: 'error',
              title: 'Gagal!',
              text: "Anda tidak memiliki toko",
            });
            signOut({ callbackUrl: '/auth/login' });
          }
          router.push('/umkm');
        } else {
          router.push('/admin');
        }
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: error.response?.data?.message || 'Terjadi kesalahan tak terduga.',
      });
      console.log(`Error login user: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingBar />
        <div className="w-full max-w-md p-8 space-y-8 bg-white border border-primary/30 shadow-lg rounded-lg text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">
            Tidak Dapat Diakses
          </h1>
          <p className="text-gray-600">
            Website ini tidak dapat diakses melalui layar mobile.
          </p>
          <Link
            href="/"
            className="underline text-primary text-sm hover:text-primary/75"
          >
            Kembali ke Halaman Utama
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoadingBar />
      <div className="w-full max-w-md p-8 space-y-8 bg-white border border-primary/30 shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Login UMKM / Admin
          </h1>
          <p className="text-gray-600">Akses dashboard untuk UMKM atau Admin</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <LabelForm label="Email">
            <InputForm
              label="Email"
              type="text"
              placeholder="email@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </LabelForm>

          <LabelForm label="Password">
            <InputForm
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </LabelForm>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              color="primary"
              size="base"
              disable={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
            <Link
              href={'/'}
              className="underline text-primary text-sm text-center hover:text-primary/75"
            >
              Halaman Desa Karangbendo
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
