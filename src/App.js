import logo from "./logo.svg";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./App.css";
import TimeLength from "./components/timeLength";
import Clock from "./components/clock";
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
  componentDidMount() {
    var audio = document.getElementById("beep");

    this.setState({ audio: audio });
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
    let audio = this.state.audio;
    audio.currentTime = 0;
    if (this.state.isPlay) clearInterval(this.timer);
    this.state.audio.pause();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      isBreakTime: false,
      isPlay: false,
      seconds: 1500,
      audio,
    });
  }

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
        <Clock
          isBreakTime={isBreakTime}
          seconds={seconds}
          isPlay={isPlay}
          handlePlay={() => this.handlePlay()}
          handleRepeate={() => this.handleRepeate()}
        />

        <div id="text_head">
          <TimeLength
            handleAdd={() => this.handleAddB()}
            handleMin={() => this.handleMinB()}
            item="Break Length"
            itemLength={breakLength}
            id="break"
          />
          <TimeLength
            handleAdd={() => this.handleAddS()}
            handleMin={() => this.handleMinS()}
            item="Session Length"
            itemLength={sessionLength}
            id="session"
          />
        </div>
        <audio
          id="beep"
          preload="true"
          src="https://assets.mixkit.co/sfx/download/mixkit-alarm-digital-clock-beep-989.wav"
        ></audio>
      </div>
    );
  }
}

export default App;
