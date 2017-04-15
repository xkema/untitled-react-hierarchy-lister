// import manipulators utility
import $mockHelpers from '../../test/mock-helpers/mock-helpers.js';
import React from 'react';
import App from './App.component.jsx';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

describe('app component rendering tests..', () => {

  beforeEach(() => {
    // skip localstorage object checks
    window.localStorage = {
      getItem: jest.fn().mockReturnValueOnce(null),
      setItem: jest.fn()
    }
  });

  test('should render app component correctly', () => {
    const _mockDataHierarchical = $mockHelpers.getDatasetHierarchical();
    const _tree = renderer.create(
      <App dataset={_mockDataHierarchical} />
    ).toJSON();
    expect(_tree).toMatchSnapshot();
  });

  test('should remove .urhl-hidden class from empty state container if dataset is empty', () => {
    const _app = mount(
      <App dataset={[]} />
    );
    expect(_app.find('#urhl-empty-state').is('.urhl-hidden')).toBeFalsy();
  });

});