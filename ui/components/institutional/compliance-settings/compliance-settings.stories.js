import React from 'react';
import { Provider } from 'react-redux';

import ComplianceSettings from '.';
import testData from '../../../../.storybook/test-data';
import configureStore from '../../../store/store';

const customData = {
  ...testData,
  metamask: {
    ...testData.metamask,
    institutionalFeatures: {
      complianceProjectId: '',
      complianceClientId: '',
      reportsInProgress: {},
    },
  },
};

const store = configureStore(customData);

export default {
  title: 'Components/Institutional/ComplianceSettings',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  component: ComplianceSettings,
  argTypes: {
    onClick: {
      action: 'onClick',
    },
  },
};

export const DefaultStory = (args) => <ComplianceSettings {...args} />;

DefaultStory.storyName = 'ComplianceSettings';
