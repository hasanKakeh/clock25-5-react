import logo from "./logo.svg";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isBreakTime: false,
      isPlay: false,
      seconds: 1500,
      
    };
    this.timer = 0;
    this.countdown = this.countdown.bind(this);
  }
  componentDidMount(){
    var audio =document.getElementById("beep")
    
    this.setState({audio:audio})
  }

  handleAddB() {
    const { isPlay, isBreakTime } = this.state;
    var { breakLength } = this.state;
    if (breakLength !== 60 && !isPlay) {
      breakLength++;
      if (isBreakTime)
        this.setState({ seconds: breakLength * 60, breakLength });
      else this.setState({ breakLength });
    }
  }
  handleAddS() {
    const { isPlay, isBreakTime } = this.state;
    var { sessionLength } = this.state;
    if (sessionLength !== 60 && !isPlay) {
      sessionLength++;
      if (isBreakTime) this.setState({ sessionLength });
      else
        this.setState({
          seconds: sessionLength * 60,
          sessionLength,
        });
    }
  }
  handleMinB() {
    const { isPlay, isBreakTime } = this.state;
    var { breakLength } = this.state;
    if (breakLength > 1 && !isPlay) {
      breakLength--;
      if (isBreakTime)
        this.setState({ seconds: breakLength * 60, breakLength });
      else this.setState({ breakLength });
    }
  }
  handleMinS() {
    const { isPlay, isBreakTime } = this.state;
    var { sessionLength } = this.state;
    if (sessionLength > 1 && !isPlay) {
      sessionLength--;
      if (isBreakTime) this.setState({ sessionLength });
      else
        this.setState({
          seconds: sessionLength * 60,
          sessionLength,
        });
    }
  }
  handleRepeate() {
    if (this.state.isPlay) clearInterval(this.timer);
    this.state.audio.pause();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      isBreakTime: false,
      isPlay: false,
      seconds: 1500,
    });
    this.state.audio.currentTime=0;
  }
  /* secondsToTime(sec) {
    if (sec >= 0) {
      var minute = Math.floor(sec / 60);
      var seconds = Math.ceil(sec % 60);
      this.setState({ time: { minute, seconds }, seconds: sec });
    }
  }*/

  handlePlay() {
    const isPlay = !this.state.isPlay;
    this.setState({ isPlay });
    if (isPlay) {
      this.timer = setInterval(this.countdown, 1000);
    } else {
      clearInterval(this.timer);
      this.state.audio.pause();
    }
  }

  countdown() {
    var seconds = this.state.seconds;
    if (seconds <= 0) {
      const audio = this.state.audio;
      audio.id = "beep";
      audio.play();

      const isBreakTime = !this.state.isBreakTime;

      if (isBreakTime) {
        seconds = this.state.breakLength * 60;
      } else seconds = this.state.sessionLength * 60;
      this.setState({ seconds, isBreakTime });
    } else {
      {
        seconds--;
        this.setState({ seconds });
      }
    }
  }
  render() {
    const {
      breakLength,
      sessionLength,
      isPlay,
      isBreakTime,
      seconds,
    } = this.state;
    return (
      <div className="App ">
        <h1>25-5 Clock</h1>
        <div id="text_head">
          <div className="text1">
            <h3 id="break-label">Break Length</h3>
            <div className="op">
              <h3
                id="break-increment"
                onClick={() => this.handleAddB()}
                className=" opP"
              >
                +
              </h3>
              <h2 id="break-length">{breakLength}</h2>
              <h3
                id="break-decrement"
                onClick={() => this.handleMinB()}
                className=" opM"
              >
                -
              </h3>
            </div>
          </div>
          <div className="text1">
            <h3 id="session-label">Session Length</h3>
            <div className="op">
              <h3
                id="session-increment"
                onClick={() => this.handleAddS()}
                className="  opP"
              >
                +
              </h3>
              <h2 id="session-length">{sessionLength}</h2>
              <h3
                id="session-decrement"
                onClick={() => this.handleMinS()}
                className="  opM"
              >
                -
              </h3>
            </div>
          </div>
        </div>
        <div></div>
        <div className="text2">
          <h3 id="timer-label">{isBreakTime ? "Break" : "Session"}</h3>
          <h1 id="time-left">
            {Math.floor(seconds / 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            :
            {Math.ceil(seconds % 60).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </h1>

          <span>
            <i
              id="start_stop"
              onClick={() => this.handlePlay()}
              class={
                isPlay ? "pointer fa fa-pause mr-3" : " pointer fa fa-play mr-3"
              }
              aria-hidden="true"
            ></i>
            <i
              id="reset"
              onClick={() => this.handleRepeate()}
              class="fa fa-repeat pointer"
              aria-hidden="true"
            ></i>
          </span>
        </div>
        <audio id="beep" preload="true" src="https://assets.mixkit.co/sfx/download/mixkit-alarm-digital-clock-beep-989.wav"></audio>
      </div>
    );
  }
}

export default App;
