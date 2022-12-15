import { FcGlobe } from 'react-icons/fc';

export default {
  name: 'globalSiteLayout',
  title: 'Global Site Layout',
  type: 'document',
  icon: FcGlobe,
  fields: [
    {
      name: 'tabs',
      type: 'object',
      fieldsets: [
        { name: 'header', title: 'Header', options: { sortOrder: 10 } },
        { name: 'footer', title: 'Footer', options: { sortOrder: 20 } },
        { name: 'desktop', title: 'Desktop', options: { sortOrder: 30 } },
        {
          name: 'cookieConsent',
          title: 'Cookie consent',
          options: { sortOrder: 40 },
        },
        { name: 'banner', title: 'Banner', options: { sortOrder: 50 } },
      ],
      fields: [
        {
          name: 'header',
          title: 'Header',
          type: 'header',
          fieldset: 'header',
        },
        {
          name: 'footer',
          title: 'Footer',
          type: 'footer',
          fieldset: 'footer',
        },
        {
          name: 'desktopSettings',
          title: 'Desktop Setting',
          type: 'desktopSettings',
          fieldset: 'desktop',
        },
        {
          name: 'cookieConsent',
          title: 'Cookie consent',
          type: 'cookieConsent',
          fieldset: 'cookieConsent',
        },
        {
          name: 'banner',
          title: 'Banner',
          type: 'banner',
          fieldset: 'banner',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Layout Settings (changes require rebuild)',
      };
    },
  },
};
