import { ipcState } from './ipc-state';

describe('ipcState', () => {
  it('should work', () => {
    expect(ipcState()).toEqual('ipc-state');
  });
});
