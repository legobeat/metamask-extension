import React from 'react';

import Alert from '.';
import README from './README.mdx';

export default {
  title: 'Components/UI/Alert',

  component: Alert,
  parameters: {
    docs: {
      page: README,
    },
  },
  argsTypes: {
    visible: {
      control: 'boolean',
    },
    msg: {
      control: 'text',
    },
  },
};

export const DefaultAlert = (args) => {
  return <Alert {...args} />;
};

DefaultAlert.storyName = 'Default';
DefaultAlert.args = {
  visible: true,
  msg: 'Alert',
};
