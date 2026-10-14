import type { Criterion } from "@prisma/client";
import { builder } from "./builder";
import { CriterionTranslationGql } from "./CriterionTranslation";

export const CriterionGql = builder.objectRef<Criterion>("Criterion");

builder.queryFields((t) => ({
  criterions: t.field({
    type: [CriterionGql],
    nullable: false,
    args: {
      lang: t.arg.string(),
    },
    resolve: (_root, { lang }, { db }) => {
      if (lang) {
        return db.criterion.findMany({
          where: { translations: { some: { lang } } },
        });
      } else {
        return db.criterion.findMany();
      }
    },
  }),
}));

builder.objectType(CriterionGql, {
  name: "Criterion",
  fields: (t) => ({
    id: t.exposeInt("id", { nullable: false }),
    icon: t.exposeString("icon", { nullable: false }),
    translations: t.field({
      type: [CriterionTranslationGql],
      nullable: { list: false, items: true },
      args: {
        lang: t.arg.string(),
      },
      resolve: (criterion, { lang }, { db }) => {
        return db.criterionTranslation.findMany({
          where: { criterionId: criterion.id, lang: lang ?? undefined },
        });
      },
    }),
    title: t.string({
      args: {
        lang: t.arg.string({ required: true }),
      },
      resolve: async (criterion, { lang }, { db }) => {
        const translation = await db.criterionTranslation.findFirst({
          where: { criterionId: criterion.id, lang },
        });

        return translation ? translation.title : null;
      },
    }),
    subtitle: t.string({
      args: {
        lang: t.arg.string({ required: true }),
      },
      resolve: async (criterion, { lang }, { db }) => {
        const translation = await db.criterionTranslation.findFirst({
          where: { criterionId: criterion.id, lang },
        });

        return translation ? translation.subtitle : null;
      },
    }),
  }),
});
