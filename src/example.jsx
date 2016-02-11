import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Component from 'react-es6-component';
import TreeView from './TreeView';

class Example extends Component {
  static propTypes = { }

  constructor(){
    super(...arguments);
    this.state = {
      nodes:  [
        {
          title: "Example",
          folder: true,
          expanded: true,
          children: [
            {
              title: 'Foos',
              folder: true,
              expanded: true,
              children: [
                {title: 'F1'},
                {title: 'F2'},
                {title: 'F3'}
              ]
            },
            {
              title: 'Bars',
              folder: true,
              expanded: true,
              children: [
                {title: 'B1'},
                {title: 'B2'}
              ]
            }
          ]
        }
      ]
    };
  }

  render(){
    return (
      <div>
        <TreeView nodes={this.state.nodes} />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Example></Example>, document.getElementById("app"));
});
