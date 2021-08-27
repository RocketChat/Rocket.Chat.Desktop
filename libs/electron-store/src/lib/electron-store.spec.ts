import { electronStore } from './electron-store';

describe('electronStore', () => {
  it('should work', () => {
    expect(electronStore()).toEqual('electron-store');
  });
});
