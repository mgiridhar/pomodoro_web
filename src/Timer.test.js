import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import { shallow, mount, render } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <Timer mins='12' title='Focus' toggle={()=>{}} round={1} rounds={12} />, div);
  //console.log(div);
  ReactDOM.unmountComponentAtNode(div);
});

it('correct initialization for display', () => {
    var mins = '25', rounds = 12;
    const wrapper = shallow( <Timer mins={mins} title='Focus' toggle={()=>{}} round={1} rounds={rounds} /> );
    //console.log(wrapper.state());
    expect(wrapper.state().mins).toBe(mins);
    expect(wrapper.state().secs).toBe('00');
    expect(wrapper.state().round).toBe(1);
    expect(wrapper.state().rounds).toBe(rounds);
});