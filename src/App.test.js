import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Timer from './Timer';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('timers set right', () => {
  const wrapper = mount(<App />);
  //console.log(JSON.stringify(wrapper.state));
  console.log(wrapper.find(App).find(Timer).html());
  console.log(wrapper.state()); 
});