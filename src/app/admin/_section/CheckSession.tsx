"use client"
import { useSession } from "next-auth/react";

const CheckSession = ()=>{
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Anda tidak memiliki akses</div>;
    }
}

export default CheckSession
