import React, { Component } from 'react';
import './App.css';
import Timer from './Timer';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      minutes: '25',
      focusMins: '25',
      sbreakMins: '05',
      lbreakMins: '15',
      breakTime: false,
      type: 'Focus',
      autoStart: true,
      totalRounds: 12,
      idxRound: 1,
    }
    this.timerRef = React.createRef();
    //console.log("started");
  }

  static defaultProps = {
    focusRange: [],
    sBreakRange: ['01', '02', '03', '04', '05'],
    lBreakRange: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    rounds: [1,2,3,4,5,6,7,8,9,10,11,12],
  }

  componentWillMount() {
    var i;
    for(i = 1; i < 10; i++) {
      this.props.focusRange.push('0' + i);
    }
    for(i = 10; i <= 60; i++) {
      this.props.focusRange.push('' + i);
    }
  }

  setTimer(e) {
    e.preventDefault();
    this.setState({
      focusMins: this.refs.focusMins.value,
      sbreakMins: this.refs.sbreakMins.value,
      lbreakMins: this.refs.lbreakMins.value,
      minutes: this.refs.focusMins.value,
      type: 'Focus',
      totalRounds: parseInt(this.refs.totalRounds.value),
      idxRound: 1,
    }, () => {
      this.timerRef.current.stopTimer();
      this.forceUpdate();
    });
    //console.log(this.refs.focusMins.value);
    //console.log(this.state);
  }

  toggleTimer() {
    if(this.state.breakTime) {
      if(this.state.idxRound === this.state.totalRounds) {
        alert("Pomodoro Ends..");
        return;
      }

      let idx = this.state.idxRound + 1;
      this.setState({
        breakTime: !this.state.breakTime,
        minutes: this.state.focusMins,
        type: 'Focus',
        autoStart: true,
        idxRound: idx,
      }, () => {
        console.log(this.state);
        this.forceUpdate()
        alert("Break ends.. Start Focusing");
        this.timerRef.current.startTimer();
      });
      
    }
    else {
      var mins, type;
      if ( (this.state.idxRound > 1) && (this.state.idxRound % 4 === 0)) {
        mins = this.state.lbreakMins;
        type = 'Long Break';
      } else {
        mins = this.state.sbreakMins;
        type = 'Short Break';
      }

      this.setState({
        breakTime: !this.state.breakTime,
        minutes: mins,
        type: type,
        autoStart: true,
      }, () => {
        console.log(this.state);
        this.forceUpdate();
        alert("Take a break");
        this.timerRef.current.startTimer();
      });
      
    }
  }

  minuteOptions(range) {
    let options = range.map(minute => {
      return (
        <option
          key={minute}
          value={minute}>{minute}</option>
      );
    });
    //console.log(options);
    return options;
  }

  roundOptions(range) {
    let options = range.map(value => {
      return (
        <option
          key={value}
          value={value}>{value}</option>
      )
    });
    return options;
  }

  timerStart = () => {
    this.timerRef.current.startTimer();
  }
  timerStop = () => {
    this.timerRef.current.stopTimer();
  }

  render () {
    console.log("app - render");
    return (
      <div className="App">
        <form onSubmit={this.setTimer.bind(this)} className="form-group">
          <label>Focus</label>
          <select ref="focusMins" defaultValue='25'>
            {this.minuteOptions(this.props.focusRange)}
          </select>
          &nbsp;minutes
          <br />
          <label>Short Break</label>
          <select ref="sbreakMins" defaultValue='05'>
            {this.minuteOptions(this.props.sBreakRange)}
          </select>
          &nbsp;minutes
          <br />
          <label>Long Break</label>
          <select ref="lbreakMins" defaultValue='15'>
            {this.minuteOptions(this.props.lBreakRange)}
          </select>
          &nbsp;minutes
          <br />
          <label>Number of Pomodoros</label>
          <select ref="totalRounds" defaultValue={12}>
            {this.roundOptions(this.props.rounds)}
          </select>
          <br />
          <input type="submit" value="Set / Reset Timer" className="btn btn-primary" />
        </form>

        <Timer mins={this.state.minutes} 
              title={this.state.type}
              toggle={this.toggleTimer.bind(this)} 
              autoStart={this.state.autoStart}
              ref={this.timerRef} />

        <div>
          <button onClick={this.timerStart} className="btn btn-primary btn-lg">Start</button> &nbsp;
          <button onClick={this.timerStop} className="btn btn-primary btn-lg">Stop</button>
        </div>

      </div>
    )
  };
}

export default App;
