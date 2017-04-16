import {APP_CONSTANTS} from '../../src/App.constants.js';

export default class VikingsGame {

  /**
   * Creates and dispatches a VikingGame event 
   * @param {string} questType - 
   */
  static dispatchVikingsGameEvent(questType) {
    var _event = new CustomEvent(APP_CONSTANTS.questEventName, { 'detail': questType });
    document.dispatchEvent(_event);
  }

}