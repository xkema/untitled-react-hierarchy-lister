export default class Manipulators {

  /**
   * Splits data into children and remains
   * @param {array} data - Data to be splited into two chunks
   * @param {number} id - Current parent element id
   * @return Splited array of data into child items and next recursion data
   */
  static splitData(data, id) {
    return data.reduce((acc, val) => {
      if(id === val.parentID) {
        acc.children.push(val);
      } else {
        acc.remains.push(val);
      }
      return acc;
    }, {
      children: [],
      remains: []
    });
  }

  /**
   * Splits data into children and remains with trying to find parent-less items in given dataset
   * @param {array} data - Data to be splited into two chunks
   * @return {array} Splited array of data into root childrend and next recursion data
   */
  static splitDataForRootItems(data) {
    return data.reduce((acc, val) => {
      if(undefined === data.find(element => val.parentID === element.ID)) {
        acc.children.push(val);
      } else {
        acc.remains.push(val);
      }
      return acc;
    }, {
      children: [],
      remains: []
    });
  }

  /**
   * Find child id's of node to be deleted from local app state
   * @param {array} data - 
   * @param {number} id - 
   * @param {array} ids - Array of id's found
   * @return {array} Array of id's
   */
  static findChildren(data, id, ids) {
    let _splitted = this.splitData(data, id);
    if(0 === _splitted.children.length) {
      return ids;
    }
    _splitted.children.forEach(child => {
      ids.push(child.ID);
      this.findChildren(_splitted.remains, child.ID, ids);      
    });
    return ids;
  }

  /**
   * Reads localstorage data
   * @return false if items is not set before, serialized object if item is available
   */
  static readLocalData() {
    let _localStorageData = window.localStorage.getItem('urhl-local-dataset');
    if(null !== _localStorageData) {
      _localStorageData = JSON.parse(_localStorageData);
    }
    return _localStorageData;
  }

  /**
   * Updates localstorage data
   * @param {object} data - 
   */
  static updateLocalData(data) {
    window.localStorage.setItem('urhl-local-dataset', JSON.stringify(data));
  }

  /**
   * Removes localstorage data
   */
  static deleteLocalData() {
    window.localStorage.removeItem('urhl-local-dataset');
  }

}