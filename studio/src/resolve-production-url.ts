// @ts-ignore
const previewSecret = import.meta.env.SANITY_STUDIO_PREVIEW_SECRET;
// @ts-ignore
const projectUrl = import.meta.env.SANITY_STUDIO_PROJECT_URL;

/**
 * This function resolves the preview url for Next.js sites by setting the preview secret,
 * the document slug and document type ("post"|"page").
 * The document type allows for correct routing in the Next.js app
 *
 * @param document Sanity schema document type
 */
export default function resolveProductionUrl(document: {
  slug: { current: string };
  _type: string;
  _id: string;
}) {
  const path = document?.slug?.current || document._id;
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${path}&type=${document._type}`;
}
