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

const href = `
'href': select(
  defined(anchorLink) && !defined(page) => anchorLink,
  defined(anchorLink) => select(page->slug.current != 'index' => page->slug.current, '') + anchorLink,
  linkType == 'internal' => select(
    page->slug.current
  ),
  linkType == 'external' => link
),
`;

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
      },
      'primaryNav': tabs.header.primaryNav->{
        ...,
        items[]{
          ...,
          'icon': icon.light{
            ...,
            asset->
          },
          'link': navItemAction{
            ...,
            ${href}
          }
        }
      },
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

export async function fetchBlogPost({ slug }: { slug: string }) {
  const res = await sanityClient.fetch(
    `*[_type == 'post' && slug.current == $slug][0] {
      'id': _id,
      _updatedAt,
      title,
      publishedAt,
      openGraph{
        ...
      },  
      body[]{
        ...,
        _type == "imageAlt" => {
          ...,
          asset->,
        },
        _type == "hint" => {
          ...,
          variant,
          content,
        },
        markDefs[]{
          ...,
          _type == "internalLink" => {
            ...,
            "slug": @.reference->slug,
            "refType": @.reference->_type,
          }
        }
      },
      excerpt,
      'plainTextExcerpt': pt::text(excerpt),
      'slug': slug.current,
      categories[]->{
        ...,
        'id': _id,
        'slug': slug.current
      },
      tags,
      mainImage{
        ...,
        asset->{...}
      },
      'author': author->{name, 'picture': picture.asset->url}
    }`,
    { slug },
  );
  return res;
}

export async function fetchAllBlogPosts() {
  const res = await sanityClient.fetch(
    `*[_type == 'post' && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc)[] {
      'id': _id,
      _updatedAt,
      title,
      shortTitle,
      publishedAt,  
      excerpt,
      'slug': slug.current,
      categories[]->{
        ...,
        'id': _id,
        'slug': slug.current
      },
      tags,
      mainImage{
        ...,
        asset->{...}
      },
      'author': author->{name, 'picture': picture.asset->url}
    }`,
  );
  return res;
}
