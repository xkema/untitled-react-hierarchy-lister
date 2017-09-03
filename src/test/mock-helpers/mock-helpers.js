/**
 * Test helpers
 */
export default class MockHelpers {

  // get sample parentless dataset
  static getDatasetParentless() {
    return [
      {ID: 500, parentID: 0, NodeThree: null, NodeTwo: null, NodeOne: null},
      {ID: 501, parentID: 7, NodeThree: null, NodeTwo: null, NodeOne: null}
    ];
  }

  // get sample hierarchical dataset
  static getDatasetHierarchical() {
    return [
      {ID: 'hola', NodeThree: null, NodeTwo: null, NodeOne: 'unique-id-for-hola'},
      {ID: 'hallo', parentID: 'merhaba', NodeThree: null, NodeTwo: null, NodeOne: 'unique-id-for-hallo'},
      {ID: 'ahoj', parentID: 'hola', NodeThree: null, NodeTwo: null, NodeOne: 'unique-id-for-ahoj'},
      {ID: 'ola', parentID: 'ciao', NodeThree: null, NodeTwo: null, NodeOne: 'unique-id-for-ola'},
      {ID: 'bonjour', parentID: 'ciao', NodeThree: null, NodeTwo: null, NodeOne: 'unique-id-for-bonjour'},
      {ID: 'ciao', parentID: 'ahoj', NodeThree: null, NodeTwo: null, NodeOne: 'unique-id-for-ciao'},
      {ID: 'slav', parentID: 'hola', NodeThree: null, NodeTwo: null, NodeOne: 'unique-id-for-slav'},
      {ID: 'merhaba', parentID: 'hola', NodeThree: null, NodeTwo: null, NodeOne: 'unique-id-for-merhaba'}
    ];
  }

  // get sample corrupted data
  static getDatasetCorrupted() {
    return [
      {ID: 500, parentID: 999, NodeThree: null, NodeTwo: null, NodeOne: null},
      {ID: 501, parentID: 500, NodeThree: null, NodeTwo: null, NodeOne: null},
      {ID: 502, parentID: 500, NodeThree: null, NodeTwo: null, NodeOne: null}
    ];
  }

}