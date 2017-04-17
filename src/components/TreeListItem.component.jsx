import React from 'react';
import Manipulators from '../utils/dataset-manipulators.util.js';
import classNames from '../../node_modules/classnames/index.js';

export default class TreeListItem extends React.Component {

  // --------------------------
  // PUBLIC API
  // --------------------------

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.toggleListItem = this._toggleListItem.bind(this);
    this.deleteNode = this._deleteNode.bind(this);
    this.toggleSureButton = this._toggleSureButton.bind(this);
  }

  render() {
    // conditionals
    let _childrenRendered = this._renderChildrenOfNode(),
        _togglerButton = this._renderTogglerButton(),
        _deleteButton = this._renderDeleteButton(),
        _sureButton = this._renderSureButton(),
        _itemDetails = this._renderItemDetails();
    // override for pseudo root node
    if(Infinity === this.props.node.ID) {
      _deleteButton = null;
      _togglerButton = null;
      _sureButton = null;
    }
    return <div className={'urhl-tree-item'}>
             <div className={'urhl-tree-item-content clearfix'}>
               {_togglerButton}
               {_itemDetails}
               <div className={'urhl-tree-item-controls'}>
                 {_sureButton}
                 {_deleteButton}
               </div>
             </div>
             {_childrenRendered}
           </div>;
  }

  // --------------------------
  // PSEUDO-PRIVATE API
  // --------------------------

  /**
   * Toggler click handler
   * @event {object} event -  
   */
  _toggleListItem(event) {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  /**
   * Show sure button handler
   * @event {object} event -  
   */
  _toggleSureButton(event) {
    this.setState({
      sure: !this.state.sure
    });
  };

  /**
   * Node delete handler
   * @event {object} event -  
   */
  _deleteNode(event) {
    this.setState({
      deleting: true
    });
    this.props.onNodeDataUpdate(this.props.node);
  };

  /**
   * Renders toggler button
   */
  _renderTogglerButton() {
    let _classSetToggleButton = {
      'urhl-icon-toggled': !this.state.expanded
    };
    if(0 === this.props.children.length) {
      return null;
    } else {
      return <button onClick={this.toggleListItem} className={'button button-clear urhl-btn-toggle'}>
               <i className={'urhl-icon urhl-icon-toggle '+classNames(_classSetToggleButton)}></i>
             </button>;
    }
  }

  /**
   * Renders sure button
   */
  _renderSureButton() {
    let _classSetSureButton = {
      'urhl-hidden': !this.state.sure
    };
    return <button onClick={this.deleteNode} className={'button button-sure urhl-btn-sure '+classNames(_classSetSureButton)}>sure?</button>;
  }

  /**
   * Renders delete button
   */
  _renderDeleteButton() {
    let _classSetDeleteButtonDelete = {
      'urhl-hidden': this.state.sure
    };
    let _classSetDeleteButtonBack = {
      'urhl-hidden': !this.state.sure
    };
    return <button onClick={this.toggleSureButton} className={'button button-clear urhl-btn-delete'}>
             <span className={classNames(_classSetDeleteButtonBack)}>&laquo; back</span>
             <span className={classNames(_classSetDeleteButtonDelete)}>delete</span>
           </button>;
  }

  /**
   * Renders item content
   */
  _renderItemDetails() {
    let _classSetItemDetails = {
      'urhl-item-details-root': Infinity === this.props.node.ID
    };
    return <div className={'urhl-item-details '+classNames(_classSetItemDetails)}>
             {/*<span>{this.props.node.ID}</span>*/}
             {/*<span>{this.props.node.parentID}</span>*/}
             <span>{this.props.node.Name}</span>
             <span>{this.props.node.City}</span>
             <span>{this.props.node.Phone}</span>
           </div>;
  }

  /**
   * Renders children of node
   */
  _renderChildrenOfNode() {
    if(0 === this.props.children.length) {
      return null;
    } else {
      // class sets
      let _classSetTogglers = {
        'urhl-tree-item-expanded': true === this.state.expanded
      };
      const _renderedElements = this.props.children.map((child, index) => {
        const _nodeData = Manipulators.splitData(this.props.remains, child.ID);
        return <li key={child.Name}>
                 <TreeListItem children={_nodeData.children} remains={_nodeData.remains} node={child} onNodeDataUpdate={this.props.onNodeDataUpdate} />
               </li>;
      });
      return <ul className={classNames(_classSetTogglers)}>
               {_renderedElements} 
             </ul>;
    } 
  }

}