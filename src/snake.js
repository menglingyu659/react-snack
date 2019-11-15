import React, { Component } from "react";
import styles from "./snake.scss";
console.log(styles);

export default function Snake(props) {
  return (
    <div className={styles.wrapper}>
      {props.children && React.cloneElement(props.children, {
        className: styles.start
      })}
      <span
        className={styles.ball}
        style={{
          transform: `translate(${props.ballLocal[0]}px, ${
            props.ballLocal[1]
          }px)`
        }}
      ></span>
      {props.snakeBody.map(ele => {
        return (
          <i
            key={ele[2]}
            className={styles.snakeBody}
            style={{ transform: `translate(${ele[0]}px, ${ele[1]}px)` }}
          ></i>
        );
      })}
    </div>
  );
}
