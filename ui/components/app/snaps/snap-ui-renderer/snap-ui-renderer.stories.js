import { panel, text, heading, divider, copyable } from '@metamask/snaps-ui';
import React from 'react';
import { Provider } from 'react-redux';

import { SnapUIRenderer } from '.';
import testData from '../../../../../.storybook/test-data';
import configureStore from '../../../../store/store';

const store = configureStore(testData);

export default {
  title: 'Components/App/SnapUIRenderer',
  component: SnapUIRenderer,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  argTypes: {
    data: {
      control: 'object',
    },
  },
};

const DATA = panel([
  heading('Foo bar'),
  text('Description'),
  divider(),
  text('More text'),
  copyable('Text you can copy'),
]);

export const DefaultStory = (args) => (
  <SnapUIRenderer snapId="local:http://localhost:8080/" data={args.data} />
);

DefaultStory.args = {
  data: DATA,
};

export const ErrorStory = (args) => (
  <SnapUIRenderer snapId="local:http://localhost:8080/" data={args.data} />
);

ErrorStory.args = {
  data: 'foo',
};
