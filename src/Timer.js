import React, { Component } from 'react';
import './App.css';

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mins: this.props.mins,
      secs: '00',
    }
  }

  componentWillReceiveProps () {
    //console.log("will receive properties ", this.props);
    this.setState({
        mins: this.props.mins,
        secs: '00',
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
    let mins = parseInt(this.state.mins);
    let secs = parseInt(this.state.secs);
    if(secs === 0 && mins === 0) {
      clearInterval(this.timer);
      this.props.toggle();
      return;
    }
    else if(secs === 0) {
      mins = mins - 1;
      secs = 59;
    }
    else {
      secs = secs - 1;
    }

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
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }

  stopTimer () {
    clearInterval(this.timer);
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
      <div key={this.props.type}>
        <label>{this.props.title}</label>
        <h1>{this.state.mins}:{this.state.secs}</h1>
      </div>
    )
  };
}

export default Timer;
