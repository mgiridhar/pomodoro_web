import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Timer from '../Timer';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

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
  const wrapper = mount(<App />);
  
  wrapper.find('#start').find('button').simulate('click');
  expect(spy.calledOnce).toBe(true);
  wrapper.unmount();
});

it('clicking pause should call timerPause', () => {
  const spy = sinon.spy(App.prototype, 'timerPause');
  const wrapper = mount(<App />);
  
  wrapper.find('#pause').find('button').simulate('click');
  expect(spy.calledOnce).toBe(true);
  wrapper.unmount();
});

it('clicking skip should call timerSkip', () => {
  const spy = sinon.spy(App.prototype, 'timerSkip');
  const wrapper = mount(<App />);
  
  wrapper.find('#skip').find('button').simulate('click');
  expect(spy.calledOnce).toBe(true);
  wrapper.unmount();
});