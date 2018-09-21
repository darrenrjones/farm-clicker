import React from 'react';
import { shallow } from 'enzyme';

import { LandingPage } from '../../components/LandingPage';

describe('<LandingPage />', () => {

  it('renders', () => {
    shallow(<LandingPage />);
  })

});

