import React from 'react';
import { shallow } from 'enzyme';

import { RegistrationPage } from '../../components/RegistrationPage';

describe('<RegistrationPage />', () => {

  it('renders', () => {
    const wrapper = shallow(<RegistrationPage />);
    expect(wrapper.length).toBe(1);
  })

});

