import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Component from 'react-es6-component';

class Example extends Component {
  static propTypes = { }
  render(){
    return (
      <h1>Example</h1>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Example></Example>, document.getElementById("app"));
});
