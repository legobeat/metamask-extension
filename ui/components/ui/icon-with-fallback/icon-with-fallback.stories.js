import React from 'react';

import IconWithFallback from '.';
import README from './README.mdx';

export default {
  title: 'Components/UI/IconWithFallback',

  component: IconWithFallback,
  parameters: {
    docs: {
      page: README,
    },
  },
  argTypes: {
    icon: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    size: {
      control: 'number',
    },
    className: {
      control: 'text',
    },
    fallbackClassName: {
      control: 'text',
    },
  },
};

export const DefaultStory = (args) => <IconWithFallback {...args} />;

DefaultStory.storyName = 'Default';

DefaultStory.args = {
  name: 'ast',
  icon: './AST.png',
  size: 24,
};

export const Fallback = (args) => <IconWithFallback {...args} />;

Fallback.args = {
  name: 'ast',
  size: 24,
};
