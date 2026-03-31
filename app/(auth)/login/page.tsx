"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Signed in as <strong>{session.user?.email}</strong></p>
        <button 
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome</h1>
      <button
        onClick={() => signIn("google")}
        className="px-6 py-3 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <img 
          className="w-6 h-6" 
          src="https://www.svgrepo.com/show/475656/google-color.svg" 
          loading="lazy" 
          alt="google logo" 
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
}