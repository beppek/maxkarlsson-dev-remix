import PicoSanity from 'picosanity';

import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config = {
  apiVersion: '2021-03-25',
  // Find these in your ./studio/sanity.json file
  dataset: 'production',
  projectId: 'hytow8kc',
  useCdn: true,
};

export const sanityClient = new PicoSanity(config);

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

export const getUrlForImage = (source: SanityImageSource) =>
  builder.image(source);

export async function fetchLogo() {
  const res = await sanityClient.fetch(
    `*[_type == 'globalSiteLayout'][0] {
      'logo': tabs.header.logo{
        ...,
        asset->
      }
    }`,
  );
  return res;
}

export async function fetchLayout() {
  const res = await sanityClient.fetch(
    `*[_type == 'globalSiteLayout'][0] {
      'backgroundOptions': tabs.desktopSettings.backgroundOptions[]{
        ...,
        options[]{
          ...,
          asset->
        }
      },
      'title': tabs.header.title,
      'logo': tabs.header.logo{
        ...,
        asset->
      }
    }`,
  );
  return res;
}

export async function fetchBackgroundOptions() {
  const res = await sanityClient.fetch(
    `*[_type == 'globalSiteLayout'][0] {
      'backgroundOptions': tabs.desktopSettings.backgroundOptions[]{
        ...,
        options[]{
          ...,
          asset->
        }
      },
    }`,
  );
  return res;
}
