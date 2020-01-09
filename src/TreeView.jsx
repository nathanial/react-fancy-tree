import $ from 'jquery';
import 'jquery-ui';
import './vendor/jquery.fancytree/jquery.fancytree';
import './vendor/jquery.fancytree/jquery.fancytree.edit';
import './vendor/jquery.fancytree/jquery.fancytree.dnd';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ContextMenuExtension from './ContextMenuExtension';

export default class TreeView extends React.Component {

  static propTypes = {
    nodes: PropTypes.array.isRequired,

    onDoubleClick: PropTypes.func,
    onSelected: PropTypes.func,
    onRename: PropTypes.func,
    style: PropTypes.object,
    onContextMenuClick: PropTypes.func,
    selectedID: PropTypes.string,

    onDragStart: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragDrop: PropTypes.func,

  };

  static defaultProps = {
    onDoubleClick: function(){},
    onRename: function(){},
    onSelected: function(){},
    onContextMenuClick: function(event, node){
      console.log("Clicked Node", node);
    },
    onDragStart: function(node, data){
      return false;
    },
    onDragEnter: function(node,data) {
      return false;
    },
    onDragDrop: function(node,data){
      return false;
    }
  };

  render() {
    return (
      <div style={this.props.style} className="tree-view">
        <div className="fancytree"></div>
        {this.props.children}
      </div>
    );
  }

  componentDidMount(){
    const $node = $(ReactDOM.findDOMNode(this));
    const $tree = $node.find('.fancytree');
    $tree.fancytree({
      toggleEffect: false,
      extensions: ["edit", "bopContextMenu", "dnd"],
      source: this.props.nodes,
      contextMenu: {onClick: this.props.onContextMenuClick},
      activate: () => {
        const tree = $tree.fancytree('getTree');
        this.props.onSelected(tree.getActiveNode());
      },
      edit: {
        beforeClose: (event, data) => {
          if(data.save){
            this.props.onRename(data.node, data.input.val());
          }
        }
      },
      dblclick: () => {
        const node = $tree.fancytree('getTree').getActiveNode();
        this.props.onDoubleClick(node);
      },
      dnd: {
        autoExpandMS: 400,
        focusOnClick: true,
        preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
        preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
        dragStart: this.props.onDragStart,
        dragEnter: this.props.onDragEnter,
        dragDrop: this.props.onDragDrop
      }
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.selectedID !== nextProps.selectedID){
      this.selectByID(nextProps.selectedID);
    }
  }

  componentWillUnmount(){
    const $node = $(ReactDOM.findDOMNode(this));
    const $tree = $node.find('.fancytree');
    $tree.fancytree('destroy');
  }

  getTree = () => {
    const $node = $(ReactDOM.findDOMNode(this));
    const $tree = $node.find('.fancytree');
    return $tree.fancytree('getTree');
  }

  selectByID = (id) => {
    if(!id){
      return;
    }
    const tree = this.getTree();
    this.deselectAll();
    function select(node){
      if(node.data && node.data.id && node.data.id === id){
        node.setSelected(true);
      } else {
        const children = node.getChildren();
        if(children){
          for(let child of children){
            select(child);
          }
        }
      }
    }
    select(tree.rootNode);
  }

  deselectAll = () => {
    const tree = this.getTree();
    function deselectChildren(children){
      if(!children){
        return;
      }
      for(let node of children){
        node.setActive(false);
        node.setSelected(false);
        deselectChildren(node.getChildren());
      }
    }
    deselectChildren(tree.rootNode.getChildren());
  }

}
