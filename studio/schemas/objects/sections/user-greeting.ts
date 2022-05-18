import { FcButtingIn } from 'react-icons/fc';

const nameOptions = [
  {
    title: 'First name',
    value: 'firstName',
  },
  {
    title: 'Last name',
    value: 'lastName',
  },
  {
    title: 'Full name',
    value: 'fullName',
  },
];

export default {
  name: 'userGreeting',
  type: 'object',
  title: 'User Greeting',
  icon: FcButtingIn,
  fields: [
    {
      title: 'Greeting text',
      name: 'text',
      type: 'string',
      description:
        'User greeting on the page. It will use this text along with the user\'s name as defined in the field below. Ex. Welcome, John.',
      initialValue: () => 'Welcome, ',
    },
    {
      title: 'Greeting name',
      name: 'name',
      type: 'string',
      description:
        'User greeting on the page. It will use the user\'s name as defined in this field along with the text in the field above. Ex. Welcome, John.',
      initialValue: () => nameOptions[0],
      options: {
        list: nameOptions,
      },
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'name',
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title.trim()} {${subtitle}}`,
      };
    },
  },
};
