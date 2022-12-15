import { RuleType } from "../../common/types";
import { PageLayoutIcon } from "../../src/components/icons";
import { pageLayouts } from "../../src/consts/page-layouts";

async function isTitleUnique(title: string, context: any) {
  // const client = getClient();
  // const id = context?.document?._id?.replace(/^drafts\./, "");
  // const query = `
  //   *[
  //     _type == "pageLayout" &&
  //     !(_id in [$draft, $published]) &&
  //     title == $title
  //   ]
  // `;
  // const result = await client.fetch(query, {
  //   title,
  //   draft: `drafts.${id}`,
  //   published: id,
  // });
  // return result.length === 0 || "Layout title must be unique";
}

export default {
  name: "pageLayout",
  title: "Page Layout",
  type: "document",
  icon: PageLayoutIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "New layout",
      validation: (Rule: RuleType, ...rest) => {
        console.log("rest :>> ", rest);
        return [
          Rule.required(),
          // Rule.custom(async (value, context) =>
          //   isTitleUnique(value as string, context),
          // ),
        ];
      },
    },
    {
      name: "template",
      title: "Template",
      type: "string",
      options: {
        layout: "select",
        list: pageLayouts,
      },
    },
    {
      name: "tabs",
      type: "object",
      fieldsets: [
        { name: "header", title: "Header", options: { sortOrder: 10 } },
        { name: "footer", title: "Footer", options: { sortOrder: 20 } },
        {
          name: "cookieConsent",
          title: "Cookie consent",
          options: { sortOrder: 30 },
        },
        { name: "banners", title: "Banners", options: { sortOrder: 40 } },
      ],
      fields: [
        {
          name: "header",
          title: "Header",
          type: "header",
          fieldset: "header",
        },
        {
          name: "footer",
          title: "Footer",
          type: "footer",
          fieldset: "footer",
        },
        {
          name: "cookieConsent",
          title: "Cookie consent",
          type: "cookieConsent",
          fieldset: "cookieConsent",
        },
        {
          name: "banners",
          title: "Banners",
          type: "array",
          of: [{ type: "banner" }],
          fieldset: "banners",
        },
      ],
    },
  ],
};
