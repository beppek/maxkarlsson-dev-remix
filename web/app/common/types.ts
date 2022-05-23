export type ImageDimensions = {
  aspectRatio: number;
  height: number;
  width: number;
};

export type PaletteVariant = {
  background: string;
  foreground: string;
  population: number;
  title: string;
};

export type Palette = {
  darkMuted: PaletteVariant;
  darkVibrant: PaletteVariant;
  dominant: PaletteVariant;
  lightMuted: PaletteVariant;
  lightVibrant: PaletteVariant;
  muted: PaletteVariant;
  vibrant: PaletteVariant;
};

export type CMSPaletteData = {
  background: string;
  foreground: string;
  population: number;
  title: string;
  _type: string;
};

export type CMSPalette = {
  darkMuted: CMSPaletteData;
  darkVibrant: CMSPaletteData;
  dominant: CMSPaletteData;
  lightMuted: CMSPaletteData;
  lightVibrant: CMSPaletteData;
  muted: CMSPaletteData;
  vibrant: CMSPaletteData;
};

export type CMSImageMetadata = {
  hasAlpha: boolean;
  isOpaque: boolean;
  lqip: string;
  dimensions: ImageDimensions;
  palette: CMSPalette;
};

export type CMSImage = {
  alt: string;
  asset: {
    extension: string;
    metadata: CMSImageMetadata;
    url: string;
  };
  caption?: string;
};

export type BodyContent = {
  _key: string;
  _type: string;
  style: string;
  children: unknown[];
  markdefs: unknown[];
};

export enum CMSContentType {
  post = 'post',
  page = 'page',
  route = 'route',
  staticRoute = 'staticRoute',
  globalSiteLayout = 'globalSiteLayout',
}

export interface CMSOpenGraph {
  enableOpenGraph?: boolean;
  description: string;
  image: CMSImage;
  locale: string;
  title: string;
  _type: 'openGraph';
}

export interface CMSContentBase {
  id: string;
  _type: CMSContentType;
  _updatedAt: string;
}

export interface Category extends CMSContentBase {
  title: string;
  slug: string;
}

export interface Post extends CMSContentBase {
  slug: string;
  title: string;
  shortTitle: string;
  publishedAt: string;
  body: BodyContent[];
  excerpt: BodyContent[];
  tags: string[];
  plainTextExcerpt: string;
  mainImage: CMSImage;
  openGraph: CMSOpenGraph;
  categories: Category[];
}
