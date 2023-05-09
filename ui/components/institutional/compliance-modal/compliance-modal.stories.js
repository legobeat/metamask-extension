import React from 'react';
import { Provider } from 'react-redux';

import ComplianceModal from '.';
import testData from '../../../../.storybook/test-data';
import configureStore from '../../../store/store';

const store = configureStore(testData);

export default {
  title: 'Components/Institutional/ComplianceModal',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  component: ComplianceModal,
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
};

export const DefaultStory = (args) => <ComplianceModal {...args} />;

DefaultStory.storyName = 'ComplianceModal';
