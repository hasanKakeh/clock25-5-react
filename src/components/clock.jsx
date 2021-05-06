import React, { Component } from "react";
class Clock extends Component {
  render() {
    const {
      seconds,
      isBreakTime,
      handlePlay,
      handleRepeate,
      isPlay,
    } = this.props;
    return (
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
            onClick={handlePlay}
            class={
              isPlay ? "pointer fa fa-pause mr-3" : " pointer fa fa-play mr-3"
            }
            aria-hidden="true"
          ></i>
          <i
            id="reset"
            onClick={handleRepeate}
            class="fa fa-repeat pointer"
            aria-hidden="true"
          ></i>
        </span>
      </div>
    );
  }
}

export default Clock;
