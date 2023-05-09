/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import ConfirmAddToken from '.';
import { tokens } from '../../../.storybook/initial-states/approval-screens/add-token';
import { store, getNewState } from '../../../.storybook/preview';
import { updateMetamaskState } from '../../store/actions';

export default {
  title: 'Pages/ConfirmImportToken',

  argTypes: {
    pendingTokens: {
      control: 'object',
      table: { category: 'Data' },
    },
  },
};

const PageSet = ({ children, pendingTokens }) => {
  const { metamask: state } = store.getState();

  useEffect(() => {
    store.dispatch(
      updateMetamaskState(
        getNewState(state, {
          pendingTokens,
        }),
      ),
    );
  }, [state, pendingTokens]);

  return children;
};

export const DefaultStory = ({ pendingTokens }) => {
  return (
    <PageSet pendingTokens={pendingTokens}>
      <ConfirmAddToken />
    </PageSet>
  );
};
DefaultStory.args = {
  pendingTokens: { ...tokens },
};
DefaultStory.storyName = 'Default';
