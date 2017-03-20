import React, {Component} from 'react';

export default class Duration {
  render() {
    console.log("qwe");
    return (
      <div>
        <input type="number" ref="hours" min="0" max="23"/>
        <input type="number" ref="minutes" min="0" max="59"/>
        <p>+7 ({this.refs.hours}) + {this.refs.minutes}</p>
      </div>
    )
  }
}