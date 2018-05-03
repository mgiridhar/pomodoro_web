import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mins: this.props.mins,
      secs: '00',
      timerState: 'ready',
      round: this.props.round,
      rounds: this.props.rounds,
      start: null,
      pause: null,
      prevPause: null,
    }
  }

  componentWillReceiveProps () {
    //console.log("will receive properties ", this.props);
    this.setState({
        mins: this.props.mins,
        secs: '00',
        timerState: 'ready',
        round: this.props.round,
        rounds: this.props.rounds,
        start: Math.round(new Date() / 1000),
        pause: 0,
        prevPause: 0,
    }, () => {
      //this.startTimer.bind(this);
    });
    
    /*if(this.props.autoStart) {
        console.log(this.state);
        console.log("starting timer");
        this.startTimer.bind(this);
    }*/
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick () {
    if((this.state.secs === '00' && this.state.mins === '00')) {
      clearInterval(this.timer);
      this.setState({
        timerState: 'stopped',
      });
      this.props.toggle();
      return;
    }

    let mins, secs;
    if(this.state.timerState === 'running') {
      var elapsed = new Date((Math.round(new Date() / 1000) - this.state.start - this.state.pause) * 1000);
      //console.log(this.state.pause);
      //console.log(elapsed.getMinutes(), elapsed.getSeconds());
      mins = parseInt(this.props.mins) - elapsed.getMinutes() - 1;
      if(mins < 0) { 
        mins = 0; 
      }
      secs = (60 - elapsed.getSeconds()) % 60;
    }
    else { //if(this.state.timerState === 'paused') {
      mins = parseInt(this.state.mins);
      secs = parseInt(this.state.secs);
    }
    //console.log('mins ' + mins, 'secs' + secs);

    /*else if(secs === 0) {
      mins = mins - 1;
      secs = 59;
    }
    else {
      secs = secs - 1;
    }*/

    mins = '' + mins;
    if(mins.length < 2) {
      mins = '0' + mins;
    }
    secs = '' + secs;
    if(secs.length < 2) {
      secs = '0' + secs;
    }
    
    this.setState({
      mins: mins,
      secs: secs,
    });
  }

  startTimer () {
    //console.log('start timer', this.state.timerState);
    if(this.state.timerState === 'ready' || this.state.timerState === 'stopped') {
      clearInterval(this.timer)
      this.setState({
        timerState: 'running',
        start: Math.round(new Date() / 1000),
        pause: 0,
      }, () => {
        this.timer = setInterval(this.tick.bind(this), 1000);
        //console.log( this.state.timerState);  
        //console.log(this.timer);
      });    
      
    }
    else if(this.state.timerState === 'paused') {
      clearInterval(this.timer);
      let pauseElapse = Math.round(new Date() / 1000) - this.state.prevPause;
      pauseElapse += this.state.pause;
      //console.log(pauseElapse);
      this.setState({
        timerState: 'running',
        pause: pauseElapse,
      }, () => {
        this.timer = setInterval(this.tick.bind(this), 1000)
        //console.log( this.state.timerState);  
        //console.log(this.timer);
      }); 
    }
  }

  stopTimer () {
    this.setState({
      timerState: 'stopped',
    });
    clearInterval(this.timer);
  }

  pauseTimer () {
    if(this.state.timerState === 'running') {
      this.setState({
        timerState: 'paused',
        prevPause: Math.round(new Date() / 1000),
      });
    }
    clearInterval(this.timer);
  }

  skipTimer () {
    this.setState({
      mins: '00',
      secs: '00',
      timerState: 'stopped',
    })
  }

  render () {
    //console.log("render - inside timer");
    //console.log(this.state);
    /*
        <div>
          <button onClick={this.startTimer.bind(this)}>Start</button>
          <button onClick={this.stopTimer.bind(this)}>Stop</button>
        </div>
    */
    return (
      <div>
        <h3>{this.props.title}</h3>
        <div>Round {this.props.round} of {this.props.rounds}</div>
        <div className="timer">{this.state.mins}:{this.state.secs}</div>
      </div>
    )
  };
}

Timer.propTypes = {
  mins: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  round: PropTypes.number.isRequired,
  rounds: PropTypes.number.isRequired,
}

export default Timer;
