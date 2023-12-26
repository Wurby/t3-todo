import Link from "next/link";
import ToDos from "./_components/todos";

import { getServerAuthSession } from "~/server/auth";
import { CreateTodo } from "./_components/create-todo";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <nav className="absolute top-0 flex h-12 w-full items-center justify-around bg-transparent">
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-8 py-1 font-semibold no-underline transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </nav>
      {session ? (
        <main className="flex min-h-screen flex-col items-center gap-4 bg-gradient-to-b from-slate-600 via-slate-800 to-neutral-950 text-white">
          <div className="h-12 w-full" />
          <CreateTodo />
          <section className="flex w-full max-w-3xl items-center justify-center">
            <ToDos />
          </section>
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center gap-4 bg-gradient-to-b from-slate-600 via-slate-800 to-neutral-950 text-white">
          <div className="h-12 w-full" />
          <section className="flex w-full max-w-3xl items-center justify-center">
            <h2 className="animate-fade-in">
              Please sign in to view your todos
            </h2>
          </section>
        </main>
      )}
    </>
  );
}
