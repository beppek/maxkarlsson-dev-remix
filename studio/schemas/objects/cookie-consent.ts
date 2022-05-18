import { FaCookieBite } from 'react-icons/fa';

export default {
  name: 'cookieConsent',
  type: 'object',
  title: 'Cookie consent',
  icon: FaCookieBite,
  fields: [
    {
      name: 'showCookieConsent',
      type: 'boolean',
      title: 'Show cookie consent?',
      initialValue: () => false,
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'blockContent',
    },
    {
      name: 'cookiePolicyLink',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      name: 'privacyPolicyLink',
      type: 'reference',
      to: [{ type: 'page' }],
    },
    {
      name: 'cookiePreferences',
      type: 'array',
      of: [
        {
          type: 'cookiePreference',
        },
      ],
    },
    {
      name: 'icon',
      description: '(Optional) icon to use in cookie consent banner',
      type: 'imageAlt',
      title: 'Icon',
    },
  ],
};
