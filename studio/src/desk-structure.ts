import { StructureBuilder as S } from '@sanity/structure';
import { FcGlobe, FcNews, FcSettings } from 'react-icons/fc';
import { AiOutlineDesktop, AiOutlineMobile } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { VscGlobe } from 'react-icons/vsc';
import SocialPreview from 'part:social-preview/component';
import { toPlainText } from 'part:social-preview/utils';

import PagePreview from './preview/pages/page-preview';

const BLOG_TYPES = ['post', 'author', 'category'];
const SETTINGS_TYPES = ['siteSettings', 'globalSiteLayout'];
const OTHER_HIDDEN = ['media.tag'];

export default () =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          ![...BLOG_TYPES, ...SETTINGS_TYPES, ...OTHER_HIDDEN].includes(
            listItem.getId(),
          ),
      ),
      S.listItem()
        .title('Blog')
        .icon(FcNews)
        .child(
          S.list()
            .title('Blog')
            .items([
              ...S.documentTypeListItems().filter((listItem: any) =>
                BLOG_TYPES.includes(listItem.getId()),
              ),
            ]),
        ),
      S.listItem()
        .title('Settings')
        .icon(FcSettings)
        .child(
          S.editor().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.listItem()
        .title('Global Site Layout')
        .icon(FcGlobe)
        .child(
          S.editor()
            .schemaType('globalSiteLayout')
            .documentId('globalSiteLayout'),
        ),
    ]);

export const getDefaultDocumentNode = (props: any) => {
  const { schemaType } = props;
  if (['page', 'post'].includes(schemaType)) {
    return S.document().views([
      S.view.form().icon(BsPencil),
      S.view
        .component(PagePreview)
        .title('Desktop preview')
        .icon(AiOutlineDesktop),
      S.view
        .component(PagePreview)
        .title('Mobile preview')
        .icon(AiOutlineMobile)
        .options({ mobile: true }),
      S.view
        .component(
          SocialPreview({
            prepareFunction: (doc) => ({
              title: doc.title,
              description:
                doc.settings?.description ||
                doc.settings?.openGraph?.description ||
                doc.openGraph?.description ||
                toPlainText(doc.body || []),
              siteUrl: process.env.SANITY_STUDIO_PROJECT_URL,
              ogImage:
                doc.settings?.openGraph?.image ||
                doc.openGraph?.image ||
                doc.mainImage,
              slug: `/${doc.slug?.current}`,
            }),
          }),
        )
        .title('Social & SEO')
        .icon(VscGlobe),
    ]);
  }
  return S.document().views([S.view.form()]);
};
