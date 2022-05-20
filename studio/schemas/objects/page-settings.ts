import { RuleType } from '../../common/types';
import { pageLayouts } from '../../src/consts/page-layouts';
import { pageTemplates } from '../../src/consts/page-templates';

export default {
  name: 'pageSettings',
  type: 'object',
  title: 'Settings',
  description: 'Additional page settings',
  fieldsets: [
    {
      title: 'Display',
      name: 'display',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'SEO',
      name: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Visibility',
      name: 'visibility',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      title: '[DEPRECATED]Page Layout',
      type: 'string',
      name: 'pageLayout',
      fieldset: 'display',
      options: {
        list: pageLayouts,
      },
      initialValue: () => pageLayouts[0].value,
    },
    {
      title: 'Page Layout',
      name: 'dynamicPageLayout',
      fieldset: 'display',
      type: 'reference',
      to: [{ type: 'pageLayout' }],
    },
    {
      title: 'Page Template',
      type: 'string',
      name: 'pageTemplate',
      fieldset: 'display',
      options: {
        list: pageTemplates,
      },
      initialValue: () => pageTemplates[0].value,
    },
    {
      title: 'Use dark theme?',
      type: 'boolean',
      name: 'darkTheme',
      fieldset: 'display',
      description: 'Use dark theme for this page?',
      initialValue: () => false,
    },
    {
      title: 'Show breadcrumbs',
      type: 'boolean',
      name: 'breadcrumbs',
      fieldset: 'display',
      description: 'Show breadcrumbs to parent page(s) on this page?',
      initialValue: () => false,
    },
    {
      title: 'Show last updated',
      type: 'boolean',
      name: 'showLastUpdated',
      fieldset: 'display',
      description: 'Show page last updated date?',
      initialValue: () => false,
    },
    {
      title: 'Use site title?',
      description:
        'Use the site settings title as page title instead of the title on the referenced page',
      name: 'useSiteTitle',
      type: 'boolean',
      fieldset: 'seo',
      initialValue: () => false,
    },
    {
      title: 'Page description',
      description: 'Page description to add to metadata tags',
      name: 'description',
      type: 'text',
      fieldset: 'seo',
      validation: (Rule: RuleType) =>
        Rule.max(155).warning('Should be under 155 characters'),
    },
    {
      title: 'Open graph',
      name: 'openGraph',
      description: '(Optional) These values populate meta tags',
      type: 'openGraph',
      fieldset: 'seo',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Include in sitemap',
      description: 'For search engines. Will be generateed to /sitemap.xml',
      name: 'includeInSitemap',
      type: 'boolean',
      fieldset: 'visibility',
      initialValue: () => true,
    },
    {
      title: 'Disallow in robots.txt',
      description: 'Hide this route for search engines like google',
      name: 'disallowRobots',
      type: 'boolean',
      fieldset: 'visibility',
      initialValue: () => false,
    },
  ],
};
