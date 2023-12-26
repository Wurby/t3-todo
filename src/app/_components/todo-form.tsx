"use client";

import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useState } from "react";

export type Todo = {
  id: string;
  name: string;
};

const TodoForm = ({ todo }: { todo: Todo }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = api.todo.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const formClasses =
    "flex h-8 w-full items-center divide-x-2 divide-slate-400 border border-slate-300  animate-fade-in";
  const formClassesIfDeleting =
    "flex h-8 w-full items-center divide-x-2 divide-slate-400 border border-slate-900 opacity-0 animate-fade-out";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleDelete.mutate({ id: todo.id });
      }}
      key={todo.id}
      className={deleting ? formClassesIfDeleting : formClasses}
    >
      <div
        className={`flex h-8 w-8 px-2 ${
          todo.id == "-1" ? "invisible" : "required"
        }`}
      >
        <input
          type="checkbox"
          onChange={(e) => {
            setDeleting(true);
            setTimeout(() => {
              if (e.target.checked) {
                handleDelete.mutate({ id: todo.id });
              }
            }, 1000);
          }}
          className="m-auto h-6 w-6"
        />
      </div>
      <div className="flex h-8 flex-grow items-center px-2">
        <h2 className="">{todo.name}</h2>
      </div>
    </form>
  );
};

export default TodoForm;
