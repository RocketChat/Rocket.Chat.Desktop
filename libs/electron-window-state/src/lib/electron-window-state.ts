import electron from 'electron';
import path from "path";
import jetpack from 'fs-jetpack';

const WINDOWS_STATE_FILE = path.join(electron.app.getPath('appData'), electron.app.getName(), 'window-states.json');

export type ElectronWindowStateOptions = {
  width: number;
  height: number;
  x?: number;
  y?: number;
  maximized?: false;
} | {
  width: number;
  height: number;
  maximized: true;
}

export class ElectronWindowState {
  get width() { return this.options.width; }
  get height() { return this.options.height; }
  get x(): number | undefined { return this.options.maximized === true ? undefined : this.options.x; }
  get y(): number | undefined { return this.options.maximized === true ? undefined : this.options.y; }
  get maximized() { return this.options.maximized; }

  private readonly options: ElectronWindowStateOptions;
  private readonly name: string;
  constructor(options: ElectronWindowStateOptions, name = 'default') {
    const storedState = this.getStoredState();
    this.options = { ...options, ...storedState?.[name] };
    this.name = name;
  }

  getStoredState(): { [key: string]: ElectronWindowStateOptions } {
    return jetpack.read(WINDOWS_STATE_FILE, 'json') || {};
  }

  get(): ElectronWindowStateOptions {
    return this.options;
  }

  private getOptions(window: Electron.BrowserWindow): ElectronWindowStateOptions{
    const bounds = window.getBounds();
    if(!window.isMaximized()) {
			return {
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y,
        maximized: false,

      }
    }

    return {
      width: bounds.width,
      height: bounds.height,
      maximized: true,
    }
  }

  save(window: Electron.BrowserWindow) {
    if (window.isFullScreen()){
      return
    }

    const options = this.getStoredState();

    const state = this.getOptions(window);

    jetpack.write(WINDOWS_STATE_FILE, { ...options, [this.name]: state }, { atomic: true });
  }
}
