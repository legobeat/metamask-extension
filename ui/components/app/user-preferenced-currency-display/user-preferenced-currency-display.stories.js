import React from 'react';

import UserPreferencedCurrencyDisplay from '.';
import { EtherDenomination } from '../../../../shared/constants/common';
import { PRIMARY, SECONDARY } from '../../../helpers/constants/common';

export default {
  title: 'Components/App/UserPreferencedCurrencyDisplay',

  argTypes: {
    className: {
      control: 'text',
    },
    'data-testid': {
      control: 'text',
    },
    prefix: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    numberOfDecimals: {
      control: 'number',
    },
    hideLabel: {
      control: 'boolean',
    },
    hideTitle: {
      control: 'boolean',
    },
    style: {
      control: 'object',
    },
    showEthLogo: {
      control: 'boolean',
    },
    ethLogoHeight: {
      control: 'number',
    },
    type: {
      control: 'select',
      options: [PRIMARY, SECONDARY],
    },
    ethNumberOfDecimals: {
      control: 'number',
    },
    fiatNumberOfDecimals: {
      control: 'number',
    },
    showFiat: {
      control: 'boolean',
    },
  },
  args: {
    type: EtherDenomination.ETH,
  },
};

export const DefaultStory = (args) => (
  <UserPreferencedCurrencyDisplay {...args} />
);

DefaultStory.storyName = 'Default';
