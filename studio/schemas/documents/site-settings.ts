import { FcSettings } from "react-icons/fc";

export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  icon: FcSettings,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "logo",
      type: "imageAlt",
      title: "Logo",
    },
    {
      title: "Open graph",
      name: "openGraph",
      description:
        "These will be the default meta tags on all pages that have not set their own",
      type: "openGraph",
    },
    // {
    //   type: 'color',
    //   name: 'primaryColor',
    //   title: 'Primary brand color',
    //   description:
    //     'Used to generate the primary accent color for websites, press materials, etc',
    // },
    // {
    //   type: 'color',
    //   name: 'secondaryColor',
    //   title: 'Secondary brand color',
    //   description:
    //     'Used to generate the secondary accent color for websites, press materials, etc',
    // },
  ],
};
