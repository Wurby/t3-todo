import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.toDo.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.toDo.delete({
        where: { id: input.id },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const latestTodo = await ctx.db.toDo.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    if (!latestTodo) {
      return [{ id: "-1", name: "No todos yet" }];
    }

    return latestTodo;
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const allTodos = await ctx.db.toDo.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    if (allTodos.length === 0) {
      return [{ id: "-1", name: "No todos yet" }];
    }

    return allTodos;
  }),
});
