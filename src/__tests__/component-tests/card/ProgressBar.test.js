import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from '../../../components/card/ProgressBar';
import { findByTestAttr } from '../../../testUtils';

const defaultProps = {
  feedChainBroken: false,
  screen: 'crops',
  type: 'wheat',
  enoughFeed: true
}

const setup = (props={}) => {
  const setupProps = {...defaultProps, ...props};
  return shallow(<ProgressBar {...setupProps} />)
};

describe('ProgressBar', () => {
  let wrapper;

  it('renders `progress-bar-display-text`', () => {
    wrapper = setup();
    const progressBarComp = findByTestAttr(wrapper, 'progress-bar-display-text');
    expect(progressBarComp.length).toBe(1);
  });

  it('has proper display text given screen: crops as props', () => {
    wrapper = setup();
    const progressBarComp = findByTestAttr(wrapper, 'progress-bar-display-text');
    expect(progressBarComp.text()).toBe('HARVEST WHEAT');
  });

  it('has proper display text given screen: animals as props', () => {
    wrapper = setup({screen: 'animals', type: 'chicken'});
    const progressBarComp = findByTestAttr(wrapper, 'progress-bar-display-text');
    expect(progressBarComp.text()).toBe('SELL EGGS');
  });
  it('has proper display text given not enough feed', () => {
    wrapper = setup({screen: 'animals', type: 'chicken', enoughFeed: false});
    const progressBarComp = findByTestAttr(wrapper, 'progress-bar-display-text');
    expect(progressBarComp.text()).toBe('not enough feed');
  });
})