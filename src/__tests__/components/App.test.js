import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import App from '../../components/App';

describe('<App />', () => {

  describe('render', () => {
    test('should render the component', () => {
      const wrapper = shallow(<App />);
      const component = wrapper.dive();
      // The dive()method returns the rendered non-DOM child of the 
      // current wrapper. That becomes useful if your component wraps 
      // another component in something like a div element, and what 
      // you're interested in testing is that inner component.

      expect(toJson(component)).toMatchSnapshot();
    });
    
  });
  
});

