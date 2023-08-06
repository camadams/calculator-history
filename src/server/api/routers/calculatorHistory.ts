// import { clerkClient } from "@clerk/nextjs";
// import { User } from "@clerk/nextjs/dist/types/server/clerkClient";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";


// const filt = (user: User) => {
//   return {
//     id: user.id,
//     username: user.username,
//     profilePictureUrl: user.profileImageUrl
//   }
// }

export const calculatorHistoryRouter = createTRPCRouter({
  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   const history = await ctx.prisma.calculatorHistory.findMany({ take: 100, });
  //   const users = (await clerkClient.users.getUserList({
  //     userId: history.map((hist) => hist.userId),
  //     limit: 100,
  //   })).map(filt);

  //   return history.map((hist) => {
  //     const user = users.find((user) => user.id === hist.userId);
  //     if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "User for history not found" });
  //     return { hist, user: user, }
  //   });
  // }),
  // getAll: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx }) => {
  //   return await ctx.prisma.calculatorHistory.findMany({ take: 100, });
  // }),

  getAll2: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.calculatorHistory.findMany({ take: 100, });
  }),

  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.calculatorHistory.findMany({ take: 100, });
  }),

  getSecretMessage: publicProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  // getAll: publicProcedure
  // // .input(z.object({ userId: z.string(), }))
  // .query(async ({ ctx }) => {
  //   // console.log("asdfasdfasdfasdfasdfsda", input.userId);
  //   console.log("asdfasdfasdfasdfasdfsda");
  //   const a = await ctx.prisma.calculatorHistory.findMany({ take: 100, });
  //   return a;
  // }),


  getByUserId: publicProcedure
    .query(async ({ ctx, input }) => {
      const history = await ctx.prisma.calculatorHistory.findMany();
      return history.map((hist) => {
        // const user = users.find((user) => user.id === hist.userId);
        // if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "User for history not found" });
        // return { hist, user: user, }
        return { hist }
      });
    }),


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

      // const users = (await clerkClient.users.getUserList({
      //   userId: a.map((hist) => hist.userId),
      //   limit: 100,
      // })).map(filt);

      // return a.map((hist) => {
      //   const user = users.find((user) => user.id === hist.userId);
      //   if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "User for history not found" });
      //   return hist
      // });
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
