import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../../testUtils';

import Playscreen from '../../../components/playscreen/Playscreen';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Playscreen store={store} />).dive();
  return wrapper;
}

describe('playscreen component', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      screenDisplay: 'cropsView',
      managerDisplay: false,
    }
    wrapper = setup(initialState);
  })
  it('renders without error', () => {
    const comp = findByTestAttr(wrapper,"comp-playscreen");
    expect(comp.length).toBe(1);
  })
})


