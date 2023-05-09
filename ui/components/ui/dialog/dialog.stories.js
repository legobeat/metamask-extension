import React from 'react';

import Dialog from '.';
import README from './README.mdx';

export default {
  title: 'Components/UI/Dialog',

  component: Dialog,
  parameters: {
    docs: {
      page: README,
    },
  },
  argsTypes: {
    children: {
      control: 'text',
    },
    type: { control: 'text' },
  },
};

export const DefaultDialog = (args) => {
  return <Dialog {...args} />;
};

DefaultDialog.storyName = 'Default';
DefaultDialog.args = {
  type: 'error',
  children: 'Dialog Box',
};
