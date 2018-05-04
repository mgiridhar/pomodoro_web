import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Timer from '../Timer';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.pause = () => { /* do nothing */ };
window.HTMLMediaElement.prototype.addTextTrack = () => { /* do nothing */ };

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('focusMins selection change and set/reset timer button click', () => {
  const spy = sinon.spy(App.prototype, 'setTimer');
  const wrapper = mount(<App />);
  //console.log(wrapper.find(App).find(Timer).html());
  //console.log(wrapper.state());
  const form = wrapper.find('form');
  const timer = wrapper.find(Timer).instance();

  //initial setting
  form.simulate('submit');
  expect(spy.calledOnce).toBe(true);
  expect(timer.state.mins).toBe('25');
  expect(timer.state.secs).toBe('00');
  
  //changing the form focusMins
  //form.find('#focusMins').simulate('change', {target: { value: '30' }}); //useless
  form.find('#focusMins').instance().value = '30';
  form.find('#totalRounds').instance().value = 5;
  //console.log(wrapper.find('#focusMins').instance().value);
  form.simulate('submit');
  expect(spy.calledTwice).toBe(true);
  //console.log(wrapper.state().focusMins);
  //console.log(timer.state.mins);
  expect(timer.state.mins).toBe('30');
  expect(timer.state.secs).toBe('00');
  expect(timer.state.rounds).toBe(5);

  form.find("#focusMins").instance().value = '20';
  form.find('#focusMins').simulate('change');
  //console.log(wrapper.state().focusMins);
  //timer = wrapper.find(Timer).instance();
  expect(timer.state.mins).toBe('20');
  expect(timer.state.secs).toBe('00');
  
  wrapper.unmount();
});

it('clicking start should call timerStart', () => {
  const spy = sinon.spy(App.prototype, 'timerStart');
  const spyChild = sinon.spy(Timer.prototype, 'startTimer');
  const wrapper = mount(<App />);
  
  wrapper.find('#start').find('button').simulate('click');
  expect(spy.calledOnce).toBe(true);
  expect(spyChild.calledOnce).toBe(true);
  wrapper.unmount();
});

it('clicking pause should call timerPause', () => {
  const spy = sinon.spy(App.prototype, 'timerPause');
  const spyChild = sinon.spy(Timer.prototype, 'pauseTimer');
  const wrapper = mount(<App />);
  
  wrapper.find('#pause').find('button').simulate('click');
  expect(spy.calledOnce).toBe(true);
  expect(spyChild.calledOnce).toBe(true);
  wrapper.unmount();
});

it('clicking skip should call timerSkip', () => {
  const spy = sinon.spy(App.prototype, 'timerSkip');
  const spyChild = sinon.spy(Timer.prototype, 'skipTimer');
  const wrapper = mount(<App />);
  
  wrapper.find('#skip').find('button').simulate('click');
  expect(spy.calledOnce).toBe(true);
  expect(spyChild.calledOnce).toBe(true);
  wrapper.unmount();
});

it('focus time to short break and back to focus with alerts', () => {
  const spy = sinon.spy(App.prototype, 'toggleTimer');  
  //const spyTick = sinon.spy(Timer.prototype, 'tick'); console.log(spyTick.callCount);
  const wrapper = mount(<App />);
  var clock = sinon.useFakeTimers();
  const focusMins = parseInt(wrapper.find('#focusMins').instance().value);
  const sbreakMins = parseInt(wrapper.find('#sbreakMins').instance().value);

  //wrapper.find(Timer).instance().forceUpdate();
  //wrapper.update(); //wrapper.find(Timer).prop('toggle')();
  expect(wrapper.find(Timer).instance().props.title).toBe('Focus');
  expect(wrapper.find('.timer').render().text()).toBe(focusMins + ':00');
  expect(wrapper.find(Timer).instance().state.round).toBe(1);
  wrapper.find('#start').find('button').simulate('click');
  clock.tick((focusMins - 1) * 60 * 1000);
  //console.log(wrapper.find(Timer).instance().state);
  expect(spy.calledOnce).toBe(false);
  clock.tick(1000);
  expect(spy.calledOnce).toBe(true);
  //console.log(wrapper.find(Timer).instance().state);

  expect(wrapper.find(Timer).instance().props.title).toBe('Short Break');
  expect(wrapper.find('.timer').render().text()).toBe('0' + sbreakMins + ':00');
  expect(wrapper.find(Timer).instance().state.round).toBe(1);
  clock.tick((sbreakMins - 1) * 60 * 1000);
  expect(spy.calledTwice).toBe(false);
  clock.tick(1000);
  expect(spy.calledTwice).toBe(true);

  expect(wrapper.find(Timer).instance().props.title).toBe('Focus');
  expect(wrapper.find('.timer').render().text()).toBe(focusMins + ':00');
  expect(wrapper.find(Timer).instance().state.round).toBe(2);
  //console.log(wrapper.find(Timer).instance().state);

  spy.restore();
  clock.restore();
  wrapper.unmount();
});

it('focus time to long break and back to focus with alerts', () => {
  const spy = sinon.spy(App.prototype, 'toggleTimer');
  const wrapper = mount(<App />);
  var clock = sinon.useFakeTimers();
  const focusMins = parseInt(wrapper.find('#focusMins').instance().value);
  const sbreakMins = parseInt(wrapper.find('#sbreakMins').instance().value);
  const lbreakMins = parseInt(wrapper.find('#lbreakMins').instance().value);
  
  wrapper.find('#start').find('button').simulate('click');
  clock.tick((focusMins - 1) * 60 * 1000);
  clock.tick(1000);
  clock.tick((sbreakMins - 1) * 60 * 1000);
  clock.tick(1000);
  clock.tick((focusMins - 1) * 60 * 1000);
  clock.tick(1000);
  clock.tick((sbreakMins - 1) * 60 * 1000);
  clock.tick(1000);
  clock.tick((focusMins - 1) * 60 * 1000);
  clock.tick(1000);
  clock.tick((sbreakMins - 1) * 60 * 1000);
  clock.tick(1000);

  expect(wrapper.find(Timer).instance().props.title).toBe('Focus');
  expect(wrapper.find('.timer').render().text()).toBe(focusMins + ':00');
  expect(wrapper.find(Timer).instance().state.round).toBe(4);
  clock.tick((focusMins - 1) * 60 * 1000);
  expect(spy.callCount).toBe(6);
  clock.tick(1000);
  expect(spy.callCount).toBe(7);
  expect(wrapper.find(Timer).instance().props.title).toBe('Long Break');
  expect(wrapper.find('.timer').render().text()).toBe(lbreakMins + ':00');
  expect(wrapper.find(Timer).instance().state.round).toBe(4);
  clock.tick((lbreakMins - 1) * 60 * 1000);
  expect(spy.callCount).toBe(7);
  clock.tick(1000);
  expect(spy.callCount).toBe(8);
  expect(wrapper.find(Timer).instance().props.title).toBe('Focus');
  expect(wrapper.find('.timer').render().text()).toBe(focusMins + ':00');
  expect(wrapper.find(Timer).instance().state.round).toBe(5);

  spy.restore();
  clock.restore();
  wrapper.unmount();
});

it('pomodoro ends after total rounds', () => {
  const spy = sinon.spy(App.prototype, 'toggleTimer');
  const wrapper = mount(<App />);
  var clock = sinon.useFakeTimers();

  const focusMins = parseInt(wrapper.find('#focusMins').instance().value);
  const sbreakMins = parseInt(wrapper.find('#sbreakMins').instance().value);
  const lbreakMins = parseInt(wrapper.find('#lbreakMins').instance().value);
  const totalRounds = parseInt(wrapper.find('#totalRounds').instance().value);

  wrapper.find('#start').find('button').simulate('click');
  for(var i = 1; i <= totalRounds; i++) {
    if(i % 4 === 0) {
      clock.tick((focusMins - 1) * 60 * 1000);
      clock.tick(1000);
      clock.tick((lbreakMins - 1) * 60 * 1000);
      clock.tick(1000);
    }
    else {
      clock.tick((focusMins - 1) * 60 * 1000);
      clock.tick(1000);
      clock.tick((sbreakMins - 1) * 60 * 1000);
      clock.tick(1000);
    }
  }

  clock.tick(2000);
  expect(wrapper.find(Timer).instance().props.title).toBe('Focus');
  expect(wrapper.find('.timer').render().text()).toBe(focusMins + ':00');
  expect(wrapper.find(Timer).instance().state.round).toBe(1);

  spy.restore();
  clock.restore();
  wrapper.unmount();
});