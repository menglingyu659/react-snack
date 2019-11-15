import React, { Component } from "react";
import Snake from "./snake";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.options = {
      snakeDirSet: {
        left: [-20, 0],
        right: [20, 0],
        up: [0, -20],
        down: [0, 20]
      }
    };
    this.flag = true;
    this.state = {
      snakeBody: [[40, 0, 0], [20, 0, 1], [0, 0, 2]],
      snakeDir: ["right"],
      ballLocal: [0, 0],
      start: true
    };
  }
  snakeOver = body => {
    const [overStatus] = body;
    const flag = body.slice(1).findIndex(ele => {
      return (
        Math.abs(overStatus[0] - ele[0]) < 20 &&
        Math.abs(overStatus[1] - ele[1]) < 20
      );
    });

    if (
      overStatus[0] > 780 ||
      overStatus[0] < 0 ||
      overStatus[1] > 780 ||
      overStatus[1] < 0 ||
      flag !== -1
    ) {
      clearInterval(this.timer);
      this.setState({
        start: true
      });
    }
  };
  ball = () => {
    // console.log(this.state.snakeBody);
    const left = Math.random() * 800;
    const top = Math.random() * 800;
    this.setState({
      ballLocal: [left, top]
    });
  };
  snakeGrow = (body, lastBody) => {
    const [snakeLocal] = body;
    const { ballLocal } = this.state;
    // console.log(ballLocal);
    if (
      Math.abs(snakeLocal[0] - ballLocal[0]) < 20 &&
      Math.abs(snakeLocal[1] - ballLocal[1]) < 20 &&
      this.flag
    ) {
      this.setState({
        snakeBody: body.push(lastBody) && body
      });
      console.log(this.state);
      this.ball();
      this.flag = false;
    } else {
      this.setState({
        snakeBody: body
      });
      this.flag = true;
    }
  };
  handleStart = (flag = false) => {
    this.setState({
      snakeBody: [[40, 0, 0], [20, 0, 1], [0, 0, 2]],
      snakeDir: ["right"],
      start: false
    });
    const _flag = flag ? this.ball() : '';
    this.snakeMove();
  };
  snakeMove = () => {
    this.timer = setInterval(() => {
      const { snakeDirSet } = this.options;
      const { snakeBody, snakeDir: snakeDirTem } = this.state;
      let snakeDir =
        snakeDirTem.length === 1
          ? snakeDirTem[0]
          : snakeDirTem.shift() && snakeDirTem[0];
      const new_snakeBody = [];
      let lastBody = null;
      snakeBody.reduce(
        (prevEle, curEle) => {
          new_snakeBody.push(prevEle);
          lastBody = [...curEle.slice(0, 2), curEle[2] + 1];
          return [...curEle.slice(0, 2), curEle[2] + 1];
        },
        [
          snakeBody[0][0] + snakeDirSet[snakeDir][0],
          snakeBody[0][1] + snakeDirSet[snakeDir][1],
          0
        ]
      );
      this.snakeGrow(new_snakeBody, lastBody);
      this.snakeOver(new_snakeBody);
    }, 150);
  };
  componentDidMount = () => {
    this.ball();
    document.documentElement.onkeydown = e => {
      const len = this.state.snakeDir.length - 1;
      const snakeDir = e.code.substring(5).toLowerCase();
      if (![37, 38, 39, 40].includes(e.which)) {
        return true;
      }
      if (
        (this.state.snakeDir[len] === "left" ||
          this.state.snakeDir[len] === "right") &&
        (snakeDir === "left" || snakeDir === "right")
      ) {
        return true;
      }
      if (
        (this.state.snakeDir[len] === "up" ||
          this.state.snakeDir[len] === "down") &&
        (snakeDir === "up" || snakeDir === "down")
      ) {
        return true;
      }
      this.state.snakeDir.push(snakeDir);
      this.setState({
        snakeDir: this.state.snakeDir
      });
      console.log(this.state.snakeDir);
      // e.preventDefault();
    };
  };
  render() {
    return (
      <div>
        <Snake
          snakeBody={this.state.snakeBody}
          ballLocal={this.state.ballLocal}
        >
          {this.state.start ? (
            <button onClick={this.handleStart}>开始</button>
          ) : null}
        </Snake>
      </div>
    );
  }
}
