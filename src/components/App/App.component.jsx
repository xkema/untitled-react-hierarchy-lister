import React from 'react';
import TreeList from '../TreeList.component.jsx';
import VikingsGame from '../VikingsGame.component.jsx';
import ManipulatorUtils from '../../utils/dataset-manipulators.util.js';
import classNames from '../../../node_modules/classnames/index.js';
import VikingsGameUtils from '../../utils/vikings-game.utils.js';
import {APP_CONSTANTS} from '../../../src/App.constants.js';

export default class App extends React.Component {

  // --------------------------
  // PUBLIC API
  // --------------------------

  constructor(props) {
    super(props);
    this.state = {
      dataset: []
    };
    this.reloadDataset = this._reloadDataset.bind(this);
    this.resetLocalData = this._resetLocalData.bind(this);
  }

  componentDidMount() {
    const _localData = ManipulatorUtils.readLocalData();
    this.setState({
      dataset: null === _localData ? this.props.dataset : _localData
    }, () => {
      ManipulatorUtils.updateLocalData(this.state.dataset);
    });
  }

  render() {
    // class sets
    let _classSetEmptyStates = {
      'urhl-hidden': 0 !== this.state.dataset.length
    };
    let _classSetFooterButton = {
      'urhl-hidden': 0 === this.state.dataset.length
    };
    // render
    return (
      <div id="urhl-main-wrapper">
        {/* site header */}
        <header id="urhl-header">
          <div className={'container'}>
            <div className={'row'}>
              <div className={'column'}>
                <a href="/" className={'button button-clear'}>hola demo</a>
                {/* vikings module */}
                <VikingsGame />
              </div>
            </div>
          </div>
        </header>
        {/* site content */}
        <main id="urhl-content">
          <div className={'container'}>
            <div className={'row row-no-padding'}>
              <div className={'column'}>
                {/* tree list */}
                <TreeList dataset={this.state.dataset} 
                          onDatasetUpdate={this.reloadDataset} />
                <div id="urhl-empty-state" className={classNames(_classSetEmptyStates)}>
                  <h1>&#128561;</h1>
                  <h2>nothing to show</h2>
                  <p>button below helps with refilling<br />&#9660;</p>
                  <p>
                    <button onClick={this.resetLocalData}>reset local data</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* site footer */}
        <footer id="urhl-footer">
          <div className={'container'}>
            <div className={'row'}>
              <div className={'column'}>
                <button onClick={this.resetLocalData} className={'button button-clear float-left '+classNames(_classSetFooterButton)}>reset local data</button>
                <a href="https://github.com/xkema/untitled-react-hierarchy-lister" className={'button button-clear'}>github link</a>
              </div>              
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // --------------------------
  // PSEUDO-PRIVATE API
  // --------------------------

  /**
   * Deletes node and childs from local collection
   * @param {object} node - Node to be deleted
   */
  _reloadDataset(node) {
    const _childrenIds = ManipulatorUtils.findChildren(this.state.dataset, node.ID, [node.ID]);
    const _updatedDataset = this.state.dataset.filter(child => !_childrenIds.find(id => child.ID === id));
    this.setState({
      dataset: _updatedDataset
    }, () => {
      ManipulatorUtils.updateLocalData(_updatedDataset);
      // dispatch quest event for delete
      VikingsGameUtils.dispatchVikingsGameEvent(APP_CONSTANTS.quests.elementDeleted);
      if(0 === this.state.dataset.length) {
        // dispatch quest event for delete all elements
        VikingsGameUtils.dispatchVikingsGameEvent(APP_CONSTANTS.quests.everythingDeleted);
      }
    });
  };

  /**
   * Resets localstorage data
   */
  _resetLocalData() {
    this.setState({
      dataset: this.props.dataset
    }, () => {
      ManipulatorUtils.deleteLocalData();
      // dispatch quest event for local data resetting
      VikingsGameUtils.dispatchVikingsGameEvent(APP_CONSTANTS.quests.localDataResetted);
    });
  };

}