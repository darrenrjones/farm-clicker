import React from 'react';
import { shallow } from 'enzyme';

import { LandingPage } from '../../components/LandingPage';

describe('<LandingPage />', () => {

  it('renders without error', () => {
    const wrapper = shallow(<LandingPage />);
    expect(wrapper.length).toBe(1);
  })

});

