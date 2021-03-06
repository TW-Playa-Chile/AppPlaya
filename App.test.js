import 'react-native';
import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import {TextInput} from 'react-native';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
      <App />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

xit('should have an input with value dependent on text state', () => {
    const fakeActivity = 'Activity 1';
    const wrapper = shallow(<App/>);

    wrapper.setState({'text' : fakeActivity});

    expect(wrapper.find(TextInput).props().value).toBe(fakeActivity);
});

xit('should change the activity text state when input is changed', () => {
    const fakeActivity = 'Activity 1';
    const wrapper = shallow(<App/>);

    wrapper.find(TextInput).simulate('ChangeText',fakeActivity);

    expect(wrapper.state('text')).toBe(fakeActivity);
});
