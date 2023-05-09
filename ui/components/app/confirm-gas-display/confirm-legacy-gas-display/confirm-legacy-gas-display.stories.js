import React from 'react';
import { Provider } from 'react-redux';

import mockState from '../../../../../test/data/mock-state.json';
import configureStore from '../../../../store/store';
import ConfirmLegacyGasDisplay from './confirm-legacy-gas-display';
import README from './README.mdx';

const store = configureStore(mockState);

export default {
  title: 'Components/App/ConfirmLegacyGasDisplay',

  component: ConfirmLegacyGasDisplay,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  parameters: {
    docs: {
      page: README,
    },
  },
};

export const DefaultStory = () => {
  return <ConfirmLegacyGasDisplay />;
};

DefaultStory.storyName = 'Default';
