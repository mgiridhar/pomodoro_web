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
        
        <nav className="navbar navbar-default navbar-fixed-top text-light bg-dark">
          <div className="container">
            
            <div className="navbar-header font-weight-bold"><a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" style={{textDecoration: 'none', color: 'white'}} className="navbar-brand" target="_blank" rel="noopener" aria-label="Wikipedia">Pomodoro Timer App</a>
            </div>
            <div className="navbar-header font-weight-light h-75 d-inline-block">
              
              <a className="nav-link p-1" href="https://github.com/mgiridhar/pomodoro_web" target="_blank" rel="noopener" aria-label="GitHub"><svg className="navbar-nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 499.36" focusable="false"><title>GitHub</title><path d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z" fill="white"></path></svg></a> 
              <a href="https://github.com/mgiridhar/pomodoro_web" style={{textDecoration: 'none', color: 'white'}} className="text-sm-center" target="_blank" rel="noopener" aria-label="GitHub">Github</a>
              
              
              
            </div>
          </div>
        </nav>
        
        
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
              onChange = {(event) => {
                this.initTimer();
              }}
              defaultValue={12}>
              {this.roundOptions(this.props.rounds, 'pomo')}
            </select>
            <label className="col-sm-1 col-form-label">&nbsp;rounds</label>
          </div>
          <div align="right" styles={{paddingRight: '5%'}}>
            <input type="submit" value="Set / Reset Timer" className="btn btn-primary" />
          </div>
          <div className='note'> Note: Changing options focus mins or number of pomodoros will reset the timer. </div>
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


/* ** TO BE ERASED **

    <nav className="navbar navbar-inverse bg-inverse fixed-top">
          <div className="container d-flex justify-content-between">
            <div className="navbar-brand" style={{color: 'whites'}}>
              Pomodoro Timer
            </div>
          </div>
        </nav>

        <div className="header-box gihub">
            <a className="github-text"
            /*css={{
              padding: '5px 10px',
              marginLeft: 10,
              whiteSpace: 'nowrap',
              display: 'inline-block',
              color: 'whitesmoke',
              ':hover': {
                //color: colors.brand,
              },

              ':focus': {
                outline: 0,
                //backgroundColor: 'whitesmoke',
                borderRadius: 15,
              },
            }} 
            href="https://github.com/mgiridhar/pomodoro_web"
            target="_blank"
            rel="noopener">
            GitHub
            </a>
          </div>
          <span className='github' style={{fontSize:'50%',}} dangerouslySetInnerHTML={{__html: "<a href='https://github.com/mgiridhar/pomodoro_web' style='text-decoration: none; color: white;' target='_blank' rel='noopener noreferrer'> Github </a>"}}></span>  

          <span dangerouslySetInnerHTML={{__html: "<div class='github-card' data-user='lepture' data-repo='github-cards'></div> <script src='https://cdn.jsdelivr.net/gh/lepture/github-cards@latest/jsdelivr/widget.js'></script>"}}> </span>

          <div className="header">
          <div className="header-box App-title"> 
            Pomodoro Timer
            <span className='github github-svg' dangerouslySetInnerHTML={{__html: "<a href='https://github.com/mgiridhar/pomodoro_web' style='text-decoration: none; color: white; font-size: 50%;' target='_blank' rel='noopener noreferrer'> Github <svg id='GitHub-Logo' xmlns='http://www.w3.org/2000/svg' style='width: 10%;height: 1.6em;'><style>.st0{fill-rule:evenodd;clip-rule:evenodd}</style><path class='st0' d='M14 0C6.27 0 0 6.43 0 14.36c0 6.34 4.01 11.72 9.57 13.62.7.13.96-.31.96-.69 0-.34-.01-1.24-.02-2.44-3.89.87-4.72-1.92-4.72-1.92-.64-1.66-1.55-2.1-1.55-2.1-1.27-.89.1-.87.1-.87 1.4.1 2.14 1.48 2.14 1.48 1.25 2.19 3.28 1.56 4.07 1.19.13-.93.49-1.56.89-1.92-3.11-.36-6.38-1.59-6.38-7.09 0-1.57.55-2.85 1.44-3.85-.14-.36-.62-1.82.14-3.8 0 0 1.18-.39 3.85 1.47a12.8 12.8 0 0 1 3.5-.48c1.19.01 2.39.16 3.5.48 2.67-1.86 3.85-1.47 3.85-1.47.76 1.98.28 3.44.14 3.8.9 1 1.44 2.28 1.44 3.85 0 5.51-3.27 6.73-6.39 7.08.5.44.95 1.32.95 2.66 0 1.92-.02 3.47-.02 3.94 0 .38.25.83.96.69C23.99 26.07 28 20.7 28 14.36 28 6.43 21.73 0 14 0z'></path></svg></a>"}} />
          
          </div>

          <button type="button" className="navbar-toggle collapsed"><span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
          </div>

          <nav class="navbar navbar-light bg-light">
              <span class="navbar-brand mb-0 h1">Pomodoro Timer App</span>
            </nav>

            fill="white" fill-rule="evenodd"
    
*/