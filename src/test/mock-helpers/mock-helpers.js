/**
 * Test helpers
 */
export default class MockHelpers {

  // get sample parentless dataset
  static getDatasetParentless() {
    return [
      {ID: 500, parentID: 0, Phone: null, City: null, Name: null},
      {ID: 501, parentID: 7, Phone: null, City: null, Name: null}
    ];
  }

  // get sample hierarchical dataset
  static getDatasetHierarchical() {
    return [
      {ID: 'hola', Phone: null, City: null, Name: 'unique-id-for-hola'},
      {ID: 'hallo', parentID: 'merhaba', Phone: null, City: null, Name: 'unique-id-for-hallo'},
      {ID: 'ahoj', parentID: 'hola', Phone: null, City: null, Name: 'unique-id-for-ahoj'},
      {ID: 'ola', parentID: 'ciao', Phone: null, City: null, Name: 'unique-id-for-ola'},
      {ID: 'bonjour', parentID: 'ciao', Phone: null, City: null, Name: 'unique-id-for-bonjour'},
      {ID: 'ciao', parentID: 'ahoj', Phone: null, City: null, Name: 'unique-id-for-ciao'},
      {ID: 'slav', parentID: 'hola', Phone: null, City: null, Name: 'unique-id-for-slav'},
      {ID: 'merhaba', parentID: 'hola', Phone: null, City: null, Name: 'unique-id-for-merhaba'}
    ];
  }

  // get sample corrupted data
  static getDatasetCorrupted() {
    return [
      {ID: 500, parentID: 999, Phone: null, City: null, Name: null},
      {ID: 501, parentID: 500, Phone: null, City: null, Name: null},
      {ID: 502, parentID: 500, Phone: null, City: null, Name: null}
    ];
  }

}