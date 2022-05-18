import { GiInfo } from 'react-icons/gi';

export default {
  name: 'icon',
  type: 'object',
  title: 'Icon',
  icon: GiInfo,
  fields: [
    {
      name: 'light',
      type: 'imageAlt',
      title: 'Light Theme Icon',
      description: 'Icon to be used with light theme (white background)',
    },
    {
      name: 'dark',
      type: 'imageAlt',
      title: 'Dark Theme Icon',
      description: 'Icon to be used with dark theme (dark background)',
    },
  ],
};
