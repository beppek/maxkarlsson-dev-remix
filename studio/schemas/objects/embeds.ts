import { FaInstagram } from 'react-icons/fa';
import { FcVideoCall } from 'react-icons/fc';
import { InstagramPreview } from '../../src/components/preview/instagram-embed';
import { EmbedPlayer } from '../../src/components/preview/embed-player';

export const instagram = {
  type: 'object',
  name: 'instagram',
  title: 'Instagram Post',
  icon: FaInstagram,
  fields: [
    {
      type: 'url',
      name: 'url',
      description: 'The URL to the post as seen in a desktop browser',
    },
  ],
  preview: {
    select: { url: 'url' },
    component: InstagramPreview,
  },
};

export const videoEmbed = {
  type: 'object',
  name: 'videoEmbed',
  title: 'Video Embed',
  icon: FcVideoCall,
  fields: [
    {
      type: 'url',
      name: 'url',
    },
  ],
  preview: {
    select: { url: 'url' },
    component: EmbedPlayer,
  },
};
