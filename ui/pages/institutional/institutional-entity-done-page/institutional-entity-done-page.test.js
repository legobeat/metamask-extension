import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import InstitutionalEntityDonePage from '.';
import mockState from '../../../../test/data/mock-state.json';
import { renderWithProvider } from '../../../../test/jest';
import configureStore from '../../../store/store';

const props = {
  history: {
    push: jest.fn(),
  },
  mostRecentOverviewPage: 'test',
  location: {
    state: { imgSrc: 'test', title: 'title', description: 'description' },
  },
};

const render = () => {
  const store = configureStore({
    ...mockState,
    metamask: {
      providerConfig: {
        type: 'test',
      },
    },
    history: {
      mostRecentOverviewPage: 'test',
    },
  });

  return renderWithProvider(<InstitutionalEntityDonePage {...props} />, store);
};

describe('InstitutionalEntityDonePage', () => {
  beforeEach(() => {
    render();
  });

  it('renders the component and shows the title', () => {
    expect(screen.getByText(props.location.state.title)).toBeInTheDocument();
  });

  it('renders the component and shows the description', () => {
    expect(
      screen.getByText(props.location.state.description),
    ).toBeInTheDocument();
  });

  it('renders the component and sets the image correctly', () => {
    const image = screen.getByAltText('Entity image');
    expect(image.src).toContain(props.location.state.imgSrc);
  });

  it('calls history push on button click', () => {
    const clickButton = screen.getByTestId('click-most-recent-overview-page');
    fireEvent.click(clickButton);
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });
});
