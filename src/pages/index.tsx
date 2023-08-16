import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Calculator from "~/components/Calculator";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function Home() {
  const { data: sessionData } = useSession();
  useEffect(() => {
    toast.success("hi");
  }, []);

  return (
    <>
      <Head>
        <title>Calculator History</title>
        <meta name="description" content="Created by Cameron Adams" />
        <link rel="icon" href="/calculator.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 p-4 ">
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
            <Calculator userId={sessionData?.user.id} />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 p-3 font-semibold no-underline transition hover:bg-slate-300/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
