import { FcAudioFile } from 'react-icons/fc';
import { sectionFields, sectionFieldsets } from '../../consts/sections';

export default {
  name: 'podcastSection',
  title: 'Podcast Section',
  type: 'object',
  icon: FcAudioFile,
  fieldsets: [...sectionFieldsets],
  fields: [
    ...sectionFields,
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'podcastLink',
      title: 'Link to podcast',
      type: 'string',
      description:
        'To get link to podcast, copy URL inside "src" property from a SoundCloud embed link.',
    },
  ],
};
