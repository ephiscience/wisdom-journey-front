import type { CriterionTranslation } from "@prisma/client";
import { builder } from "./builder";

export const CriterionTranslationGql = builder.objectRef<CriterionTranslation>(
  "CriterionTranslation",
);

builder.objectType(CriterionTranslationGql, {
  name: "CriterionTranslation",
  fields: (t) => ({
    id: t.exposeInt("id"),
    lang: t.exposeString("lang"),
    title: t.exposeString("title"),
    subtitle: t.exposeString("subtitle"),
    criterionid: t.int({
      resolve: (translation) => translation.criterionId,
    }),
  }),
});
