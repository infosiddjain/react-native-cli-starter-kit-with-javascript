import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/store/rootReducer';
import Dropdown from '@/components/Dropdown';

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

jest.useFakeTimers();
// Let the sheet's close animation finish before each test ends.
afterEach(() => act(() => jest.runAllTimers()));

const ITEMS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

const render = props => {
  const store = configureStore({ reducer: rootReducer });
  let tree;
  act(() => {
    tree = ReactTestRenderer.create(
      <Provider store={store}>
        <Dropdown items={ITEMS} {...props} />
      </Provider>,
    );
  });
  return tree;
};

const findByLabel = (tree, label) =>
  tree.root.find(
    node => node.props.accessibilityLabel === label && node.props.onPress,
  );
const findOption = (tree, role) =>
  tree.root.findAll(
    node => node.props.accessibilityRole === role && node.props.onPress,
  );

it('shows the selected label and picks a new value', () => {
  const onChange = jest.fn();
  const tree = render({ label: 'Fruit', value: 'apple', onChange });

  act(() => findByLabel(tree, 'Fruit').props.onPress());
  act(() => findOption(tree, 'radio')[1].props.onPress());

  expect(onChange).toHaveBeenCalledWith('banana');
});

it('toggles values in multiple mode', () => {
  const onChange = jest.fn();
  const tree = render({
    label: 'Fruit',
    multiple: true,
    value: ['apple'],
    onChange,
  });

  act(() => findByLabel(tree, 'Fruit').props.onPress());
  act(() => findOption(tree, 'checkbox')[0].props.onPress());
  expect(onChange).toHaveBeenLastCalledWith([]);

  act(() => findOption(tree, 'checkbox')[1].props.onPress());
  expect(onChange).toHaveBeenLastCalledWith(['apple', 'banana']);
});
