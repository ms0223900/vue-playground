/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
export type DropEl = HTMLElement | null | undefined

const stopEventDefault = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
const checkIsDragIn = (e: DragEvent) => (
  e.dataTransfer && e.dataTransfer.items.length > 0
);

export interface AreaDragDropOptions {
  onSetDragging?: (_dragging: boolean) => any
  onAddFileList?: (_files: File[]) => any
}

class AreaDragDrop {
  dragCounter = 0

  _dragging: boolean

  dropEl: DropEl

  cancelRegisterEventsFn?: (...params: any) => any

  onSetDragging?: AreaDragDropOptions['onSetDragging']

  onAddFileList?: AreaDragDropOptions['onAddFileList']

  constructor(dropEl?: DropEl, options = {} as AreaDragDropOptions) {
    this.dropEl = dropEl;
    this._dragging = false;
    this.onSetDragging = options.onSetDragging;
    this.onAddFileList = options.onAddFileList;
  }

  init(dropEl: DropEl, options = {} as AreaDragDropOptions) {
    this.dropEl = dropEl;
    this.onSetDragging = options.onSetDragging;
    this.onAddFileList = options.onAddFileList;
    this.cancelRegisterEventsFn = this.registerEvents();
  }

  private registerEvents() {
    if (this.dropEl) {
      const el = this.dropEl;
      el.addEventListener('dragenter', this.handleDragIn);
      el.addEventListener('dragover', this.handleDragging);
      el.addEventListener('drop', this.handleDrop);
      el.addEventListener('dragleave', this.handleDragOut);

      return () => {
        el.removeEventListener('dragenter', this.handleDragIn);
        el.removeEventListener('dragover', this.handleDragging);
        el.removeEventListener('drop', this.handleDrop);
        el.removeEventListener('dragleave', this.handleDragOut);
      };
    }
    return () => {};
  }

  set dragging(_d: boolean) {
    this.onSetDragging && this.onSetDragging(_d);
    this._dragging = _d;
  }

  private handleDragIn = (e: DragEvent): void => {
    stopEventDefault(e);
    this.dragCounter += 1;
    if (checkIsDragIn(e)) {
      this.dragging = true;
    }
  }

  private handleDragging = (e: DragEvent): void => {
    stopEventDefault(e);
  }

  private handleDragOut = (e: DragEvent): void => {
    stopEventDefault(e);
    this.dragCounter -= 1;
    if (this.dragCounter === 0) {
      this.dragging = false;
    }
  }

  private handleDrop = (e: DragEvent): void => {
    stopEventDefault(e);
    const isInDragArea = checkIsDragIn(e);
    this.dragging = false;
    if (isInDragArea && e.dataTransfer) {
      const { files } = e.dataTransfer;
      this.onAddFileList && this.onAddFileList([...files]);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  }
}

export default AreaDragDrop;
