"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireEducator({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || role !== "educator")) {
            router.push("/");
        }
    }, [user, role, loading, router]);

    if (loading) return <p>Loading...</p>;
    if (!user || role !== "educator") return null;

    return <>{children}</>;
}
