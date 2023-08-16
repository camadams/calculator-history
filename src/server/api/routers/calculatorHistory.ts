import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const calculatorHistoryRouter = createTRPCRouter({
  getHistByUserId: protectedProcedure
    .input(z.object({ userId: z.string().optional(), }))
    .query(async ({ ctx, input }) => {
      if (!input.userId) return [];
      const hist = await ctx.prisma.calculatorHistory.findMany({
        where: { userId: input.userId, },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      });


      return hist;
    }),

  create: protectedProcedure
    .input(z.object({ content: z.string(), }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.calculatorHistory.create({
        data: {
          userId: ctx.session.user.id,
          content: input.content,
        }
      });
    }),
});
