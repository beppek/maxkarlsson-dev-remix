const supportedLanguages = [
  { id: "enAu", title: "Australian English", isDefault: true },
  { id: "enUs", title: "American English" },
  { id: "es", title: "Spanish" },
  { id: "nb", title: "Norwegian" },
  { id: "sv", title: "Swedish" },
];

export default {
  name: "localeString",
  title: "Locale String",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "string",
    fieldset: lang.isDefault ? null : "translations",
  })),
};
