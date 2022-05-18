export const sections = [
  { type: 'hero' },
  { type: 'cta' },
  { type: 'textSection' },
  { type: 'pageBuilderColumns' },
  { type: 'imageAlt', title: 'Image' },
  { type: 'listing', title: 'Listing' },
  { type: 'pageNav', title: 'Page Menu' },
  { type: 'teamSection' },
  { type: 'youtube' },
  { type: 'podcastSection' },
];

export const sectionFields = [
  {
    title: 'Section label',
    name: 'label',
    type: 'string',
    description: 'Used for display purposes in this interface',
  },
  {
    title: 'Anchor',
    name: 'anchor',
    type: 'string',
    description: 'Section anchor. Excluding #',
    fieldset: 'settings',
  },
  {
    name: 'textColor',
    type: 'color',
    fieldset: 'settings',
  },
  {
    name: 'background',
    type: 'background',
    fieldset: 'settings',
  },
];

export const sectionFieldsets = [
  {
    title: 'Settings',
    name: 'settings',
    description: 'Section settings',
    options: {
      collapsible: true,
      collapsed: true,
    },
  },
  {
    title: 'Components',
    name: 'components',
    description: 'Select section component',
  },
];
