"use client";

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateTodo() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo.mutate({ name });
      }}
      className="flex gap-4"
    >
      <input
        type="text"
        placeholder="Todo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-grow border border-slate-400 bg-transparent px-4 py-0.5 outline-none"
      />
      <button
        type="submit"
        className="border border-slate-300 bg-white/10 px-8 py-0.5 font-semibold transition hover:bg-white/20"
        disabled={createTodo.isLoading}
      >
        {createTodo.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
