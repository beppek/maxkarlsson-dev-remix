import { StructureBuilder as S } from '@sanity/structure';
import { InitialValueTemplateItemBuilder } from '@sanity/structure/lib/InitialValueTemplateItem';
import { InitialValueTemplateItemBuilderItem } from '../common/types';

const DISALLOWED_CREATE_NEW = [
  'siteSettings',
  'staticRoute',
  'globalSiteLayout',
];

export default S.defaultInitialValueTemplateItems().filter(
  (value: InitialValueTemplateItemBuilder) => {
    const { spec } = value as unknown as InitialValueTemplateItemBuilderItem;
    return !DISALLOWED_CREATE_NEW.includes(spec.id);
  },
);
