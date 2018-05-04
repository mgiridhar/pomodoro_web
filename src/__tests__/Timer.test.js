import React from 'react';
import ReactDOM from 'react-dom';
import Timer from '../Timer';
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

    clock.restore();
    wrapper.unmount();
});

it('timer runs correctly - decrements every second and unaffected by multiple start clicks', () => {
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
    
    // additinal start clicks should modify the timer state or stop the timer
    wrapper.instance().startTimer();
    clock.tick(2000); // after 2 more seconds
    expect(wrapper.state().mins).toBe('' + (parseInt(mins)-2));
    expect(wrapper.state().secs).toBe('24');
    expect(wrapper.state().timerState).toBe('running');
    expect(wrapper.find('.timer').render().text()).toBe((parseInt(mins)-2) + ':24');

    clock.restore();
    wrapper.unmount();
});

it('timer stops at the end and calls toggle', () => {
    var mins = '25', rounds = 12;
    var fakeToggle = sinon.fake();
    const wrapper = mount( <Timer mins={mins} title='Focus' toggle={fakeToggle} round={1} rounds={rounds} /> );
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

    // calls toggle
    expect(fakeToggle.calledOnce).toBe(true);

    //after 2 seconds is the timer still running?
    clock.tick(2000);
    expect(wrapper.state().mins).toBe('00');
    expect(wrapper.state().secs).toBe('00');
    expect(wrapper.state().timerState).toBe('stopped');
    expect(wrapper.find('.timer').render().text()).toBe('00:00');

    clock.restore();
    wrapper.unmount();
});

it('pausing timer and resume', () => {
    var mins = '25', rounds = 12;
    const wrapper = mount( <Timer mins={mins} title='Focus' toggle={()=>{}} round={1} rounds={rounds} /> );
    var clock = sinon.useFakeTimers();
    wrapper.instance().startTimer();
    clock.tick(4000); // after 4 seconds

    // testing pause
    wrapper.instance().pauseTimer();
    clock.tick(2000); // after 2 more seconds
    expect(wrapper.state().mins).toBe('' + (parseInt(mins)-1));
    expect(wrapper.state().secs).toBe('56');
    expect(wrapper.state().timerState).toBe('paused');
    expect(wrapper.find('.timer').render().text()).toBe((parseInt(mins)-1) + ':56');

    // one more pause should change the state of timer
    wrapper.instance().pauseTimer();
    clock.tick(2000); // after 2 more seconds
    expect(wrapper.state().mins).toBe('' + (parseInt(mins)-1));
    expect(wrapper.state().secs).toBe('56');
    expect(wrapper.state().timerState).toBe('paused');
    expect(wrapper.find('.timer').render().text()).toBe((parseInt(mins)-1) + ':56');

    // testing resume
    wrapper.instance().startTimer();
    clock.tick(3000); // after 3 seconds
    expect(wrapper.state().mins).toBe('' + (parseInt(mins)-1));
    expect(wrapper.state().secs).toBe('53');
    expect(wrapper.state().timerState).toBe('running');
    expect(wrapper.find('.timer').render().text()).toBe((parseInt(mins)-1) + ':53');

    clock.restore();
    wrapper.unmount();
});

it('skipping timer', () => {
    var mins = '25', rounds = 12;
    const wrapper = mount( <Timer mins={mins} title='Focus' toggle={()=>{}} round={1} rounds={rounds} /> );
    var clock = sinon.useFakeTimers();
    wrapper.instance().startTimer();
    clock.tick(3000); // after 3 seconds
    wrapper.instance().skipTimer();
    expect(wrapper.state().mins).toBe('00');
    expect(wrapper.state().secs).toBe('00');
    expect(wrapper.state().timerState).toBe('stopped');
    expect(wrapper.find('.timer').render().text()).toBe('00:00');
    clock.restore();
    wrapper.unmount();
});

it('stopping timer and starting back', () => {
    var mins = '25', rounds = 12;
    const wrapper = mount( <Timer mins={mins} title='Focus' toggle={()=>{}} round={1} rounds={rounds} /> );
    var clock = sinon.useFakeTimers();
    wrapper.instance().startTimer();
    clock.tick(4000); // after 4 seconds

    // testing pause
    wrapper.instance().stopTimer();
    expect(wrapper.state().timerState).toBe('stopped');
    clock.tick(2000); // after 2 more seconds
    expect(wrapper.state().mins).toBe('' + (parseInt(mins)-1));
    expect(wrapper.state().secs).toBe('56');
    expect(wrapper.state().timerState).toBe('stopped');
    expect(wrapper.find('.timer').render().text()).toBe((parseInt(mins)-1) + ':56');

    // now issueing a start should restart timer from beginning
    wrapper.instance().startTimer();
    clock.tick(2000); // after 2 seconds
    expect(wrapper.state().mins).toBe('' + (parseInt(mins)-1));
    expect(wrapper.state().secs).toBe('58');
    expect(wrapper.state().timerState).toBe('running');
    expect(wrapper.find('.timer').render().text()).toBe((parseInt(mins)-1) + ':58');
    
    clock.restore();
    wrapper.unmount();
});