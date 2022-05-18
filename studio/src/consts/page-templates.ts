export enum PageTemplates {
  landingPage = 'Landing Page',
  legalPage = 'Legal Content',
  supportPage = 'Support Page',
  articleListingPage = 'Article Listing Page',
}

export const pageTemplates = Object.keys(PageTemplates).map((key) => ({
  title: PageTemplates[key],
  value: key,
}));
