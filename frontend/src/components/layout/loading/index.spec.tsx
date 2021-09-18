/**
 * @jest-environment jsdom
 */

import { cleanup, render } from '@testing-library/react';
import Loading from '.';

describe('src/components/loading/index.tsx', () => {
  afterEach(() => cleanup());

  test('Render Loading component', () => {
    const renderedLoading = render(<Loading />);

    expect(renderedLoading.container).toMatchSnapshot();
  });
});