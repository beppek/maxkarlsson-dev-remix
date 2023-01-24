import PicoSanity from "picosanity";
import groq from "groq";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ListingPostFragment } from "~/common/types";

const config = {
  apiVersion: "2021-03-25",
  // Find these in your ./studio/sanity.json file
  dataset: "production",
  projectId: "hytow8kc",
  useCdn: true,
};

export const sanityClient = new PicoSanity(config);

interface Args {
  previewToken?: string;
}

const previewClient = (apiToken: string) =>
  new PicoSanity({ ...config, token: apiToken, useCdn: false });

function getClient({ previewToken }: Args) {
  return previewToken ? previewClient(previewToken) : sanityClient;
}

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient);

export const getUrlForImage = (source: SanityImageSource) =>
  builder.image(source).auto("format");

export async function fetchLogo() {
  const res = await sanityClient.fetch(
    groq`*[_type == 'globalSiteLayout'][0] {
      'logo': tabs.header.logo{
        ...,
        asset->
      }
    }`
  );
  return res;
}

const href = groq`
'href': select(
  defined(anchorLink) && !defined(page) => anchorLink,
  defined(anchorLink) => select(page->slug.current != 'index' => page->slug.current, '') + anchorLink,
  linkType == 'internal' => select(
    page->slug.current
  ),
  linkType == 'external' => link
),
`;

const listingPostFragment = groq`
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
  'author': author->{name, 'picture': picture.asset->url},
`;

export async function fetchLayout(args?: Args) {
  const res = await getClient({ previewToken: args?.previewToken }).fetch(
    groq`*[_type == 'globalSiteLayout'][0] {
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
    }`
  );
  return res;
}

export async function fetchBackgroundOptions(config: Args) {
  const res = await getClient(config).fetch(
    groq`*[_type == 'globalSiteLayout'][0] {
      'backgroundOptions': tabs.desktopSettings.backgroundOptions[]{
        ...,
        options[]{
          ...,
          asset->
        }
      },
    }`
  );
  return res;
}

export async function fetchBlogPost({
  slug,
  previewToken,
}: { slug: string } & Args) {
  const res = await getClient({ previewToken }).fetch(
    groq`*[_type == 'post' && slug.current == $slug][0] {
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
      'author': author->{name, 'picture': picture.asset->url},
      'relatedPosts': *[_type == 'post' && @.slug.current != $slug && references(*[_id in ^.categories[]->_id]._id) && dateTime(@.publishedAt) <= dateTime(now())] | order(publishedAt desc)[0..5] {
        ${listingPostFragment}
      },
      'latestPosts': *[_type == 'post' && @.slug.current != $slug && dateTime(@.publishedAt) <= dateTime(now())] | order(publishedAt desc)[0..5] {
        ${listingPostFragment}
      },
    }`,
    { slug }
  );
  return res;
}

export async function fetchAllBlogPosts(
  args?: Args
): Promise<ListingPostFragment[]> {
  const res = await getClient({ previewToken: args?.previewToken }).fetch(
    groq`*[_type == 'post' && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc)[] {
      ${listingPostFragment}
    }`
  );
  return res;
}

export async function fetchPage({
  slug,
  previewToken,
}: { slug: string } & Args) {
  const res = await getClient({ previewToken }).fetch(
    groq`*[_type == 'page' && slug.current == $slug][0] {
      'id': _id,
      _updatedAt,
      title,
      parentPage,
      pageLayout,
      openGraph{
        ...
      },  
      sections,
    }`,
    { slug }
  );
  return res;
}

export async function fetchDocumentCount({
  previewToken,
  _type,
}: {
  _type: string;
} & Args) {
  const query = groq`
    count(*[_type == $type${
      !previewToken ? ' && !(_id in path("drafts.**"))' : ""
    }])
  `;
  const data = await getClient({ previewToken }).fetch(query, { type: _type });
  return data;
}

export async function fetchLatestQuickThought(args?: Args) {
  const query = groq`*[_type == 'quickThought'&& dateTime(publishedAt) <= dateTime(now())] | order(_updatedAt desc)[0]`;
  const data = await getClient({ previewToken: args?.previewToken }).fetch(
    query
  );
  return data;
}

export async function fetchAllQuickThoughts(args?: Args) {
  const query = groq`*[_type == 'quickThought'&& dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc)`;
  const data = await getClient({ previewToken: args?.previewToken }).fetch(
    query
  );
  return data;
}

export async function fetchHomePage(args?: Args) {
  const query = groq`*[_type == 'home' && _id == 'home'][0] {
    ...,
    links[]{
      ...,
      'link': link.page->slug.current
    }
  }`;
  const res = await getClient({ previewToken: args?.previewToken }).fetch(
    query
  );
  return res;
}
