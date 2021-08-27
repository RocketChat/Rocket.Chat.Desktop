import equal from 'deep-equal';
import { Emitter } from '@rocket.chat/emitter';
import { IpcMainEvent, IpcRendererEvent, ipcRenderer, ipcMain, BrowserWindow } from 'electron';
import { IpcMainInvokeEvent } from 'electron/common';

export const IS_RENDERER = (process && process.type === 'renderer');

const IPC_STATE = 'ipcState';

type R<T, K extends keyof T = keyof T> = [K, T[K]];

export type DefaultStatetMap = Record<string | symbol, unknown>;

abstract class IpcStateBase<StateMap extends DefaultStatetMap> extends Emitter<{
  change: R<StateMap>;
}> {
  store: Map<keyof StateMap, StateMap[keyof StateMap]>;
  readonly name: string;
  constructor(name: string, store: Map<keyof StateMap, StateMap[keyof StateMap]>){
    super();
    this.name = `${IPC_STATE}-${name}`;
    this.store = new Map(store);
  }
  abstract set<K extends keyof StateMap>(key: K, value: StateMap[K]): void;
  abstract get<K extends keyof StateMap>(key: K): StateMap[K];
}


type IpcStateEventArg<T extends DefaultStatetMap = DefaultStatetMap> = {
  key: keyof T;
  value: T[keyof T];
};

export class IpcStateMain<StateMap extends DefaultStatetMap = DefaultStatetMap > extends IpcStateBase<StateMap> {
  renderer = new WeakSet<IpcMainEvent['sender']>();

  constructor(name: string, store: Map<keyof StateMap, StateMap[keyof StateMap]>){
    super(name, store);

    if (IS_RENDERER) {
      throw new Error('IpcStateMain can only be used in the main process');
    }

    ipcMain.handle(`${this.name}-INIT`, (event: IpcMainInvokeEvent) => {
      this.renderer.add(event.sender);
      return this.store;
    });

    ipcMain.handle(`${this.name}-SET`, (event: IpcMainInvokeEvent, args: IpcStateEventArg<StateMap>) => {
      this.set(args.key, args.value);
      event.returnValue = true;
    });
  }

  set<K extends keyof StateMap>(key: K, value: StateMap[K]): void {
    if (equal(value, this.get(key))) {
      return;
    }

    this.store.set(key, value);

    for (const window of BrowserWindow.getAllWindows()) {
      if (this.renderer.has(window.webContents)) {
        window.webContents.send(`${this.name}-CHANGED`,{ key, value });
      }
    }
  }

  get<K extends keyof StateMap>(key: K): StateMap[K] {
    const result = this.store.get(key);
    if (!result) {
      throw new Error(`Key ${key} not found`);
    }
    return result as StateMap[K];
  }

  static getStore<P extends DefaultStatetMap>(name: string, store: Map<keyof P, P[keyof P]>): IpcStateMain<P> {
    return new IpcStateMain(name, store);
  }
}

export class IpcStateRenderer<StateMap extends DefaultStatetMap = DefaultStatetMap> extends IpcStateBase<StateMap> {
  constructor(name: string, store: Map<keyof StateMap, StateMap[keyof StateMap]>){
    super(name, store);

    if (!IS_RENDERER) {
      throw new Error('IpcStateRenderer can only be used in the renderer process');
    }

    (async () => {
      const store = await ipcRenderer.invoke(`${this.name}-INIT`);
      this.store = store;
    })()

    ipcRenderer.on(`${this.name}-CHANGED`, (event: IpcRendererEvent, args: IpcStateEventArg<StateMap>) => {
      this.set(args.key, args.value);
    });
  }

  set<K extends keyof StateMap>(key: K, value: StateMap[K]): void {
    if (equal(value, this.get(key))) {
      return;
    }
    ipcRenderer.send(`${this.name}-SET`, [key, value]);
    this.store.set(key, value);
    this.emit('change', [key, value]);
  }

  get<K extends keyof StateMap>(key: K): StateMap[K] {
    const result = this.store.get(key);
    if (!result) {
      throw new Error(`Key ${key} not found`);
    }
    return result as StateMap[K];
  }
}
