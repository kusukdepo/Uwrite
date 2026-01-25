"use client";

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function ensureUserDoc(uid: string, email: string | null) {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            await setDoc(ref, {
                email,
                role: "student",
                createdAt: new Date(),
            });
        }
    }

    async function handleEmailLogin() {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            await ensureUserDoc(res.user.uid, res.user.email);
            router.push("/");
        } catch (e: any) {
            setError(e.message);
        }
    }

    async function handleGoogleLogin() {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            await ensureUserDoc(res.user.uid, res.user.email);
            router.push("/");
        } catch (e: any) {
            setError(e.message);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
            <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow dark:bg-zinc-900">
                <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    Sign in to Uwrite
                </h1>

                <div className="flex flex-col gap-4">
                    <input
                        className="rounded border px-3 py-2 dark:bg-zinc-800"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="rounded border px-3 py-2 dark:bg-zinc-800"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        onClick={handleEmailLogin}
                        className="rounded bg-black py-2 text-white hover:bg-zinc-800 dark:bg-white dark:text-black"
                    >
                        Sign in with Email
                    </button>

                    <button
                        onClick={handleGoogleLogin}
                        className="rounded border py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        Sign in with Google
                    </button>

                    {error && <p className="text-sm text-red-600">{error}</p>}
                </div>
            </div>
        </div>
    );
}
