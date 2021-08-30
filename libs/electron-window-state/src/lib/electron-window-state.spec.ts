import { electronWindowState } from './electron-window-state';

describe('electronWindowState', () => {
  it('should work', () => {
    expect(electronWindowState()).toEqual('electron-window-state');
  });
});
