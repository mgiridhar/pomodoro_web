import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

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
    expect(wrapper.state().timerState).toBe('ready');
    expect(wrapper.find('.timer').render().text()).toBe(mins+':00');
    wrapper.unmount();
});

it('timer runs correctly - decrements every second', () => {
    var mins = '25', rounds = 12;
    const wrapper = mount( <Timer mins={mins} title='Focus' toggle={()=>{}} round={1} rounds={rounds} /> );
    var clock = sinon.useFakeTimers();
    wrapper.instance().startTimer();
    clock.tick(2000); // after 2 seconds
    expect(wrapper.state().mins).toBe('' + (parseInt(mins)-1));
    expect(wrapper.state().secs).toBe('58');
    expect(wrapper.state().timerState).toBe('running');
    expect(wrapper.find('.timer').render().text()).toBe((parseInt(mins)-1) + ':58');
    //console.log(wrapper.find('.timer').render().text());

    clock.tick(92 * 1000); // after a minute and a half + 2 seconds
    expect(wrapper.state().mins).toBe('' + (parseInt(mins)-2));
    expect(wrapper.state().secs).toBe('26');
    expect(wrapper.state().timerState).toBe('running');
    expect(wrapper.find('.timer').render().text()).toBe((parseInt(mins)-2) + ':26');
    //console.log(wrapper.find('.timer').render().text());
    
    wrapper.unmount();
});

it('timer stops at the end', () => {
    var mins = '25', rounds = 12;
    const wrapper = mount( <Timer mins={mins} title='Focus' toggle={()=>{}} round={1} rounds={rounds} /> );
    var clock = sinon.useFakeTimers();
    wrapper.instance().startTimer();
    clock.tick(parseInt(mins) * 60 * 1000);
    expect(wrapper.state().mins).toBe('00');
    expect(wrapper.state().secs).toBe('00');
    expect(wrapper.state().timerState).toBe('stopped');
    expect(wrapper.find('.timer').render().text()).toBe('00:00');
    //console.log(wrapper.find('.timer').render());
    //console.log(wrapper.find('.timer').text());
    //console.log(wrapper.html());

    //after 2 seconds is the timer still runnging?
    clock.tick(2000);
    expect(wrapper.state().mins).toBe('00');
    expect(wrapper.state().secs).toBe('00');
    expect(wrapper.state().timerState).toBe('stopped');
    expect(wrapper.find('.timer').render().text()).toBe('00:00');

    wrapper.unmount();
});