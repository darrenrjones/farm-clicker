import React from 'react';
import { shallow } from 'enzyme';

import { RegistrationPage } from '../../components/RegistrationPage';

describe('<RegistrationPage />', () => {

  it('renders', () => {
    shallow(<RegistrationPage />);
  })
  
});

