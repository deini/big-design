import { render } from '@test/utils';
import 'jest-styled-components';
import React from 'react';

import { Flex, FlexItem } from './index';

test('render flex', () => {
  const { container } = render(<Flex>Flex</Flex>);

  expect(container.firstChild).toMatchSnapshot();
});

test('has display flex', () => {
  const { container } = render(<Flex>Flex</Flex>);

  expect(container.firstChild).toHaveStyle('display: flex');
});

test('forwards styles', () => {
  const { container } = render(
    <Flex className="test" style={{ background: 'red' }}>
      Flex
    </Flex>,
  );

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('Flex Item forwards styles', () => {
  const { container } = render(
    <FlexItem className="test" style={{ background: 'red' }}>
      Flex
    </FlexItem>,
  );

  expect(container.getElementsByClassName('test').length).toBe(1);
  expect(container.firstChild).toHaveStyle('background: red');
});

test('rendering as another element retains inherited props and styles', () => {
  const { getByTestId } = render(<Flex as="section" margin="medium" data-testid="flex" />);

  const flex = getByTestId('flex');

  expect(flex.tagName).toBe('SECTION');
  expect(flex).toHaveStyle(`margin: 1rem`);
});

test('Flex Item should handle falsy values (0)', () => {
  const { getByTestId } = render(<FlexItem data-testid="flex" flexShrink={0} />);

  const flex = getByTestId('flex');

  expect(flex).toHaveStyle('flex-shrink: 0');
});
