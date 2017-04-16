import React from 'react';
import classNames from '../../node_modules/classnames/index.js';
import VikingsGameUtils from '../utils/vikings-game.utils.js';
import {APP_CONSTANTS} from '../../src/App.constants.js';

export default class VikingsGame extends React.Component {

  // --------------------------
  // PUBLIC API
  // --------------------------

  constructor(props) {
    super(props);
    this.state = {
      questsPanelOpened: false,
      elementExpanded: false,
      localDataResetted: false,
      elementDeleted: false,
      everythingDeleted: false,
      lastQuestClicked: false,
      panelMinimized: true,
      percentage: 0,
      numQuestsComplete: 0
    };
    this.toggleQuestsPanel = this._toggleQuestsPanel.bind(this);
    this.lastQuestComplete = this._lastQuestComplete.bind(this);
  }

  /**
   * Listen to quest events
   */
  componentDidMount() {
    document.addEventListener(APP_CONSTANTS.questEventName, (event) => {
      window.setTimeout(() => {
        // set checkbox
        let _nextState = {};
        _nextState[event.detail] = true;
        // _nextState.numQuestsComplete = this.state.numQuestsComplete + 1;
        // _nextState.percentage = Math.floor((this.state.numQuestsComplete + 1) / 0.06);
        this.setState(_nextState);
      }, 400);
    });
  }

  render() {
    let _classSetVikingsGame = {
      'panel-minimized': this.state.panelMinimized
    };
    let _classSetQuestsButton = {
      'button-clear': this.state.panelMinimized
    };
    return <div className={'urhl-vikings-game '+classNames(_classSetVikingsGame)}>
             <button onClick={this.toggleQuestsPanel} className={'button button-outline urhl-btn-quests '+classNames(_classSetQuestsButton)}>
               <span>&#127881; show quests &#127881; {/*<i>%{this.state.percentage}</i>*/}</span>
               <span>hide {/*<i>%{this.state.percentage}</i>*/}</span>
             </button>
             <div>
               <h3>&#127881;</h3>
               <h4>Quest List</h4>
             </div>
             <ul className={'urhl-quest-list'}>
               <li>
                 <span>Open Quests Panel <code>easy</code></span>
                 <input type="checkbox" checked={this.state.questsPanelOpened} readOnly />
                 <code title={'Click show quests button for a single time to unlock.'}>&#63;</code>
               </li>
               <li>
                 <span>Expand any Element <code>easy</code></span>
                 <input type="checkbox" checked={this.state.elementExpanded} readOnly />
                 <code title={'Click expand button for a single time to unlock.'}>&#63;</code>
               </li>
               <li>
                 <span>Delete an Element <code>medium</code></span>
                 <input type="checkbox" checked={this.state.elementDeleted} readOnly />
                 <code title={'Delete any element from list.'}>&#63;</code>
               </li>
               <li>
                 <span>Reset Local Data <code>medium</code></span>
                 <input type="checkbox" checked={this.state.localDataResetted} readOnly />
                 <code title={'Click reset local data button from empty state or footer.'}>&#63;</code>
               </li>
               <li>
                 <span>Delete All Elements <code>hard</code></span>
                 <input type="checkbox" checked={this.state.everythingDeleted} readOnly />
                 <code title={'Delete all elements in the list'}>&#63;</code>
               </li>
               <li>
                 <span>Complete Quest List <code>hard</code></span>
                 <input type="checkbox" checked={this.state.lastQuestClicked} onChange={this.lastQuestComplete} />
                 <code title={'Manually check last checkbox in the Quest List.'}>&#63;</code>
               </li>
             </ul>
           </div>;
  }

  // --------------------------
  // PSEUDO-PRIVATE API
  // --------------------------

  /**
   * Toggler flag for game panel
   */
  _toggleQuestsPanel() {
    this.setState({
      panelMinimized: !this.state.panelMinimized
    }, () => {
      if(!this.state.panelMinimized) {
        // dispatch quest event for open quests panel
        VikingsGameUtils.dispatchVikingsGameEvent(APP_CONSTANTS.quests.questsPanelOpened);
      }
    });
  };

  /**
   * 
   */
  _lastQuestComplete() {
    this.setState({
      lastQuestClicked: !this.state.lastQuestClicked
    }, () => {
      if(this.state.lastQuestClicked) {
        // dispatch quest event for open last quest clicking
        VikingsGameUtils.dispatchVikingsGameEvent(APP_CONSTANTS.quests.lastQuestClicked);
      }
    });
  };

}