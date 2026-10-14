import type { QuestionTranslation } from "../generated/prisma/client";
import { builder } from "./builder";

export const QuestionTranslationGql = builder.objectRef<QuestionTranslation>(
  "QuestionTranslation",
);

builder.objectType(QuestionTranslationGql, {
  name: "QuestionTranslation",
  fields: (t) => ({
    id: t.exposeInt("id"),
    lang: t.exposeString("lang"),
    translation: t.exposeString("translation"),
    questionid: t.int({
      resolve: (translation) => translation.questionId,
    }),
  }),
});
