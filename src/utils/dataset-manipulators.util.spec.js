// import manipulators utility
import $manipulators from './dataset-manipulators.util.js';
import $mockHelpers from '../test/mock-helpers/mock-helpers.js';
import React from 'react';

// hola tests
describe('dataset-manipulators.util.js tests..', () => {
  
  test('should always pass!', () => {
    expect(true).toBeTruthy();
  });

  test('should not find all corresponding ID\'s for parentID\'s of item in a given dataset', () => {
    const _mockDataCorrupted = $mockHelpers.getDatasetCorrupted();
    // console.log(_mockDataCorrupted);
    let _parentlessChild = false;
    _mockDataCorrupted.forEach((item) => {
      if(undefined === _mockDataCorrupted.find(element => item.parentID === element.ID)) {
        _parentlessChild = true;
      }
    });
    expect(_parentlessChild).toBeTruthy();
  });

  test('should split data into two pieces with their sum equal to input data length', () => {
    const _mockDataParentless = $mockHelpers.getDatasetParentless(),
          _splittedData = $manipulators.splitDataForRootItems(_mockDataParentless);
    expect(_splittedData.children.length + _splittedData.remains.length).toBe(_mockDataParentless.length);
  }); 

  test('should return null if localstorage data hasn\'t set yet', () => {
    // mock localstorage object with empty data
    window.localStorage = {
      getItem: jest.fn().mockReturnValueOnce(null)
    }
    expect($manipulators.readLocalData()).toBeNull();
  });

  test('should split hierarchical mock data into 2 parts with 3 children and 5 remains', () => {
    const _mockDataHierarchical = $mockHelpers.getDatasetHierarchical(),
          _splittedData = $manipulators.splitData(_mockDataHierarchical, 'hola');
    expect(_splittedData.children.length).toEqual(3);
    expect(_splittedData.remains.length).toEqual(5);
  });

});

