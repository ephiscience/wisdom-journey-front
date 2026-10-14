import type { Question } from "../generated/prisma/client";
import { builder } from "./builder";
import { QuestionTranslationGql } from "./QuestionTranslation";

export const QuestionGql = builder.objectRef<Question>("Question");

builder.queryFields((t) => ({
  questions: t.field({
    type: [QuestionGql],
    nullable: false,
    args: {
      lang: t.arg.string(),
    },
    resolve: (_root, { lang }, { db }) => {
      if (lang) {
        return db.question.findMany({
          where: { translations: { some: { lang } } },
        });
      } else {
        return db.question.findMany();
      }
    },
  }),
  question: t.field({
    type: QuestionGql,
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (_root, { id }, { db }) => {
      return db.question.findUnique({ where: { id } });
    },
  }),
}));

builder.objectType(QuestionGql, {
  name: "Question",
  fields: (t) => ({
    id: t.exposeInt("id"),
    translations: t.field({
      type: [QuestionTranslationGql],
      nullable: { list: true, items: true },
      args: {
        lang: t.arg.string(),
      },
      resolve: (question, { lang }, { db }) => {
        return db.questionTranslation.findMany({
          where: { questionId: question.id, lang: lang ?? undefined },
        });
      },
    }),
    text: t.string({
      args: {
        lang: t.arg.string({ required: true }),
      },
      resolve: async (question, { lang }, { db }) => {
        const translation = await db.questionTranslation.findFirst({
          where: { questionId: question.id, lang },
        });

        return translation ? translation.translation : null;
      },
    }),
  }),
});
