import { api } from "~/trpc/server";
import TodoForm from "./todo-form";
import type { Todo } from "./todo-form";

const ToDos = async () => {
  const todoItems = await api.todo.getAll.query();

  return (
    <section className="animate-fade-in flex w-full flex-col">
      <div className="flex h-8 w-full items-center divide-x-2 divide-slate-400 border border-slate-300">
        <div className="flex h-8 w-8 items-center px-2">
          <h2>✅</h2>
        </div>
        <div className="flex h-8 flex-grow items-center px-2">
          <h2 className="">Todo Names</h2>
        </div>
      </div>
      {todoItems[0]?.id == "-1" ? (
        <h2 className="animate-fade-in">{todoItems[0].name}</h2>
      ) : (
        todoItems.map((todo: Todo) => <TodoForm todo={todo} />)
      )}
    </section>
  );
};

export default ToDos;
