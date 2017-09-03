import React from 'react';
import TreeList from '../TreeList.component.jsx';
import Manipulators from '../../utils/dataset-manipulators.util.js';
import classNames from '../../../node_modules/classnames/index.js';

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
    this.randomizeLocalData = this._randomizeLocalData.bind(this);
  }

  componentDidMount() {
    const _localData = Manipulators.readLocalData();
    this.setState({
      dataset: null === _localData ? this.props.dataset : _localData
    }, () => {
      Manipulators.updateLocalData(this.state.dataset);
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
                <TreeList dataset={this.state.dataset} onDatasetUpdate={this.reloadDataset} />
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
                <button onClick={this.randomizeLocalData} className={'button button-clear float-left '+classNames(_classSetFooterButton)}>randomize local data</button>
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
    const _childrenIds = Manipulators.findChildren(this.state.dataset, node.ID, [node.ID]);
    const _updatedDataset = this.state.dataset.filter(child => 'undefined' === typeof _childrenIds.find(id => child.ID === id));
    window.setTimeout(() => {
      this.setState({
        dataset: _updatedDataset
      }, () => {
        Manipulators.updateLocalData(_updatedDataset);
      });      
    }, 100);
  };

  /**
   * Resets localstorage data
   */
  _resetLocalData() {
    this.setState({
      dataset: this.props.dataset
    }, () => {
      Manipulators.deleteLocalData();
    });
  };

  /**
   * Randomizes localstorage data
   */
  _randomizeLocalData() {
    const randomized = Manipulators.generateRandomData(100);
    this.setState({
      dataset: randomized
    }, () => {
      Manipulators.deleteLocalData();
    });
  };

}