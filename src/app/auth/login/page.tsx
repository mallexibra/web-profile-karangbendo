"use client"
import Button from "@/components/button/Button";
import { InputForm } from "@/components/forms/InputForm";
import LabelForm from "@/components/forms/LabelForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/sidebar/Navbar";
import Link from "next/link";

export default function Login() {
    const router = useRouter()
    const loginSchema = yup.object().shape({
        email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
        password: yup.string().min(8, "Password minimal 8 karakter").required("Password wajib diisi")
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const handleLogin = async (data: any) => {
        try {
            const response: any = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            });

            if (response?.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: "Email/Password Anda Salah!",
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses!',
                    text: 'Anda sukses login',
                });

                const session = await getSession();

                if (session?.user?.role === 'umkm') {
                    router.push('/umkm');
                } else {
                    router.push('/admin');
                }
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: "error.response?.data?.message || 'Terjadi kesalahan tak terduga.'",
            });
            console.log(`Error login user: ${error}`);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            {/* <Navbar/> */}
            <div className="w-full max-w-md p-8 space-y-8 bg-white border border-primary/30 shadow-lg rounded-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary mb-2">Login UMKM / Admin</h1>
                    <p className="text-gray-600">Akses dashboard untuk UMKM atau Admin</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                    <LabelForm label="Email">
                        <InputForm
                            label="Email"
                            type="text"
                            placeholder="email@example.com"
                            {...register("email")}
                        />
                        {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
                    </LabelForm>

                    <LabelForm label="Password">
                        <InputForm
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            {...register("password")}
                        />
                        {errors.password && (<p className="text-red-500 text-sm">{errors.password.message}</p>)}
                    </LabelForm>

                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div> */}

                    <div className="flex flex-col gap-2">
                        <Button type="submit" color="primary" size="base">
                            Login
                        </Button>
                        <Link href={"/"} className="underline text-primary text-sm text-center hover:text-primary/75">Halaman Desa Karangbendo</Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
