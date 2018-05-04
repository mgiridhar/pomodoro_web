import React, { Component } from 'react';
import './App.css';
import Timer from './Timer';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
//import 'react-s-alert/dist/s-alert-css-effects/slide.css';
//import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
//import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
//import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import alertSound from './alert-sounds/alert-01.mp3';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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
      cssClass: 'box-right-focus',
      autoStart: true,
      totalRounds: 12,
      idxRound: 1,
      running: false,
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
    if(this.props.focusRange.length === 0) {
      var i;
      for(i = 1; i < 10; i++) {
        this.props.focusRange.push('0' + i);
      }
      for(i = 10; i <= 60; i++) {
        this.props.focusRange.push('' + i);
      }
    }
  }

  initTimer = () => {
    this.setState({
      focusMins: this.refs.focusMins.value,
      sbreakMins: this.refs.sbreakMins.value,
      lbreakMins: this.refs.lbreakMins.value,
      minutes: this.refs.focusMins.value,
      breakTime: false,
      type: 'Focus',
      cssClass: 'box-right-focus',
      totalRounds: parseInt(this.refs.totalRounds.value),
      idxRound: 1,
      running: false,
    }, () => {
      this.timerStop.bind(this);
      //this.timerRef.current.stopTimer();
      this.forceUpdate();
    });
  }

  setTimer(e) {
    e.preventDefault();
    this.initTimer();
    //console.log(this.refs.focusMins.value);
    //console.log(this.state);
  }

  toggleTimer() {
    if(this.state.breakTime) {

      let idx = this.state.idxRound + 1;
      if(idx > this.state.totalRounds) {
        this.initTimer();
        Alert.warning('Pomodoro Ends..!', {
          position: 'top',
          effect: 'stackslide',
          timeout: 10000,
        });
        //alert("Pomodoro Ends..");
        return;
      }

      this.setState({
        breakTime: !this.state.breakTime,
        minutes: this.state.focusMins,
        type: 'Focus',
        cssClass: 'box-right-focus',
        autoStart: true,
        idxRound: idx,
      }, () => {
        //console.log(this.state);
        this.forceUpdate();
        
        Alert.warning('Break ends.. Start Focusing!', {
          position: 'top-right',
          effect: 'genie',
          timeout: 10000,
        });
        //alert("Break ends.. Start Focusing");
      });
      this.timerRef.current.startTimer();
      
    }
    else {
      var mins, type, cssClass;
      if ( (this.state.idxRound > 1) && (this.state.idxRound % 4 === 0)) {
        mins = this.refs.lbreakMins.value; //this.state.lbreakMins;
        type = 'Long Break';
        cssClass = 'box-right-lbreak';
      } else {
        mins = this.refs.sbreakMins.value; //this.state.sbreakMins;
        type = 'Short Break';
        cssClass = 'box-right-sbreak';
      }
      //console.log(cssClass);
      this.setState({
        breakTime: !this.state.breakTime,
        minutes: mins,
        type: type,
        cssClass: cssClass,
        autoStart: true,
      }, () => {
        //console.log(this.state);
        this.forceUpdate();
        Alert.warning('Take a break!', {
          position: 'top-right',
          effect: 'bouncyflip',
          timeout: 10000,
        });
        //alert("Take a break");
        
      });
      this.timerRef.current.startTimer();
    }
  }

  minuteOptions(range, type) {
    let options = range.map(minute => {
      return (
        <option
          key={minute + type}
          value={minute}>{parseInt(minute)}</option>
      );
    });
    //console.log(options);
    return options;
  }

  roundOptions(range, type) {
    let options = range.map(value => {
      return (
        <option
          key={value + type}
          value={value}>{value}</option>
      )
    });
    return options;
  }

  timerStart() {
    this.timerRef.current.startTimer();
  }
  timerStop() {
    this.timerRef.current.stopTimer();
  }
  timerPause() {
    this.timerRef.current.pauseTimer();
  }
  timerSkip() {
    this.timerRef.current.skipTimer();
  }

  render () {
    //console.log("app - render");
    return (
      <div className="App">
        <div className="App-title"> Pomodoro Timer </div>
        
        <form onSubmit={this.setTimer.bind(this)} className="form-group box box-left">
          <div className="form-group row">
            <label className="col-sm-5 col-form-label">Focus</label>
            
            <select ref="focusMins" id="focusMins" className="col-sm-2"
              //onMouseDown={if(this.options.length>8) {this.size=8;}}
              //onchange='this.size=0;' onblur="this.size=0;"
              onChange = {(event) => {
                //console.log(this.refs.focusMins.value);
                this.initTimer();
                /*this.setState({
                  focusMins: event.target.value,
                  minutes: event.target.value,
                }, () => this.forceUpdate());*/
              }}
              defaultValue='25'>
              {this.minuteOptions(this.props.focusRange, 'focus')}
            </select>
            
            <label className="col-sm-1 col-form-label">&nbsp;minutes</label>
          </div>
          <div className="form-group row">
            <label className="col-sm-5 col-form-label">Short Break</label>
            <select ref="sbreakMins" id="sbreakMins"
              className="col-sm-2"
              /*onChange = {(event) => {
                this.setState({
                  sbreakMins: event.target.value,
                });
              }}*/
              defaultValue='05'>
              {this.minuteOptions(this.props.sBreakRange, 'sbreak')}
            </select>
            <label className="col-sm-1 col-form-label">&nbsp;minutes</label>
          </div>
          <div className="form-group row">
            <label className="col-sm-5 col-form-label">Long Break</label>
            <select ref="lbreakMins" id="lbreakMins"
              className="col-sm-2"
              /*onChange = {(event) => {
                this.setState({
                  lbreakMins: event.target.value,
                });
              }}*/
              defaultValue='15'>
              {this.minuteOptions(this.props.lBreakRange, 'lbreak')}
            </select>
            <label className="col-sm-1 col-form-label">&nbsp;minutes</label>
          </div>

          <div className="form-group row">
            <label className="col-sm-5 col-form-label">Number of Pomodoros</label>
            <select ref="totalRounds" id="totalRounds"
              className="col-sm-2"
              /*onChange = {(event) => {
                this.setState({
                  totalRounds: event.target.value,
                });
              }}*/
              defaultValue={12}>
              {this.roundOptions(this.props.rounds, 'pomo')}
            </select>
            <label className="col-sm-1 col-form-label">&nbsp;rounds</label>
          </div>
          <div align="right" styles={{paddingRight: '5%'}}>
            <input type="submit" value="Set / Reset Timer" className="btn btn-primary" />
          </div>

        </form>
        

        <div className={"box box-right " + this.state.cssClass} >
          <Timer mins={this.state.minutes} 
                title={this.state.type}
                toggle={this.toggleTimer.bind(this)}
                autoStart={this.state.autoStart}
                round={this.state.idxRound}
                rounds={this.state.totalRounds}
                ref={this.timerRef} />
          <div className='button' id='start'>
            <button onClick={this.timerStart.bind(this)} className="btn btn-primary btn-lg">Start</button> 
          </div>
          <div className='button' id='pause'>
            <button onClick={this.timerPause.bind(this)} className="btn btn-primary btn-lg">Pause</button>
          </div>
          <div className='button' id='skip'>
            <button onClick={this.timerSkip.bind(this)} className="btn btn-primary btn-lg">Skip</button>
          </div>
        </div>

        <Alert stack={{limit: 3}} html={true} beep={alertSound} />

      </div>
    )
  };
}

export default App;
