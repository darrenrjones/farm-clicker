import React from 'react';
import { shallow } from 'enzyme';

import App from '../../components/App';
import { isTrimmed } from '../../validators';

describe('<App />', () => {

  it('renders', () => {
    shallow(<App />);
  })
  
});

