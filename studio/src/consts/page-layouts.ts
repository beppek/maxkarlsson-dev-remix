export enum PageLayouts {
  default = 'Default Layout',
  home = 'Home page layout',
}

export const pageLayouts = Object.keys(PageLayouts).map((key) => ({
  title: PageLayouts[key],
  value: key,
}));
