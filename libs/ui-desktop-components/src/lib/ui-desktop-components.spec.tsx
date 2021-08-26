import { render } from '@testing-library/react';

import UiDesktopComponents from './ui-desktop-components';

describe('UiDesktopComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiDesktopComponents />);
    expect(baseElement).toBeTruthy();
  });
});
