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

  /**
   * Generate random data
   */
  static generateRandomData(length) {
    const randomKeywords = `JavaScript (/ˈdʒɑːvəˌskrɪpt/[6]), often abbreviated as JS, is a high-level, dynamic, weakly typed, object-based, multi-paradigm, and interpreted programming language. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA. As a multi-paradigm language, JavaScript supports event-driven, functional, and imperative (including object-oriented and prototype-based) programming styles. It has an API for working with text, arrays, dates, regular expressions, and basic manipulation of the DOM, but does not include any I/O, such as networking, storage, or graphics facilities, relying for these upon the host environment in which it is embedded. Initially only implemented client-side in web browsers, JavaScript engines are now embedded in many other types of host software, including server-side in web servers and databases, and in non-web programs such as word processors and PDF software, and in runtime environments that make JavaScript available for writing mobile and desktop applications, including desktop widgets. Although there are strong outward similarities between JavaScript and Java, including language name, syntax, and respective standard libraries, the two languages are distinct and differ greatly in design; JavaScript was influenced by programming languages such as Self and Scheme.[7]`.toLowerCase().replace(/[;:',\-\(\)\.\[\d\]]/gmi, '').replace(/(?:\b\s?(but|and|or|that|of|as|is|in|was|with|a|to|the|an|it|on|by)\b\s?)/gmi, ' ').split(/\s+/gmi);
    let randomized = [];
    for(let i=0; i<length; i++) {
      const parentID = Math.floor(Math.random() * i);
      let item = {
        ID: i,
        NodeThree: `${randomKeywords[Math.floor(Math.random() * randomKeywords.length)]}`,
        NodeTwo: `${randomKeywords[Math.floor(Math.random() * randomKeywords.length)]}`,
        NodeOne: `${randomKeywords[Math.floor(Math.random() * randomKeywords.length)]}`
      };
      if(0 !== parentID) {
        item.parentID = parentID;
      }
      randomized.push(item);
    }
    return randomized;
  }

}