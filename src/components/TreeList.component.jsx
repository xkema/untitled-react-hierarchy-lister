import React from 'react';
import TreeListItem from './TreeListItem.component.jsx';
import ManipulatorUtils from '../utils/dataset-manipulators.util.js';

export default class TreeList extends React.Component {

  // --------------------------
  // PUBLIC API
  // --------------------------

  /**
   * 
   * @dataset 
   */
  constructor(props) {
    super(props);
    this.datasetUpdated = this._datasetUpdated.bind(this);
  }

  render() {
    // get root children (prepare first-level depth data to start recursion)
    const _treeListRootData = ManipulatorUtils.splitDataForRootItems(this.props.dataset);

    // skip if root has no child
    if(0 === _treeListRootData.children.length) {
      return null;
    }

    // @todo :: check data quality ?
    
    // create de-facto node for root item (Cidade de Deus, Hell of Heaven, Prayers)
    const _node = {
      City: 'City',
      ID: Infinity,
      Name: 'Name',
      Phone: 'Phone',
      parentID: Math.pow(Infinity, Infinity)
    };

    // render tree root items with defacto root node
    return <div className={'urhl-tree'}>
             <TreeListItem children={_treeListRootData.children} 
                           remains={_treeListRootData.remains} 
                           node={_node} 
                           onNodeDataUpdate={this.datasetUpdated} />
           </div>;
  }

  // --------------------------
  // PSEUDO-PRIVATE API
  // --------------------------

  /**
   * Last stop for node to be deleted
   * @param {object} node - Node to be deleted
   */
  _datasetUpdated(node) {
    this.props.onDatasetUpdate(node);
  }

}