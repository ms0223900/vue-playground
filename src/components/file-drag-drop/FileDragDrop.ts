/* eslint-disable no-unused-expressions */
import AreaDragDrop, { DropEl } from './AreaDragDrop';
import FileListHolder from './FileListHolder';
import StateUpdater from './StateUpdater';

export interface FileDragDropState {
  dragging: boolean
  fileList: File[]
  onSetDragging?: (_dragging: boolean) => any
  onSetFileCb?: (files: File[]) => any
}
type Listner = (_s: FileDragDropState) => any

const initState: FileDragDropState = {
  dragging: false,
  fileList: [],
};

class FileDragDrop {
  stateUpdater: StateUpdater<FileDragDropState>

  dragDrop: AreaDragDrop

  fileHolder: FileListHolder

  constructor(dropEl: DropEl, listners?: Listner[]) {
    this.stateUpdater = new StateUpdater<FileDragDropState>(initState, listners);

    this.fileHolder = new FileListHolder({
      onSetFileList: (fileList) => this.stateUpdater.setState({
        fileList,
      }),
    });

    this.dragDrop = new AreaDragDrop(dropEl);
  }

  init(dropEl: AreaDragDrop['dropEl'], listners?: Listner[]): void {
    this.stateUpdater.addListner(listners);
    this.dragDrop.init(dropEl, {
      onAddFileList: (_f) => this.fileHolder.addNewFile(_f),
      onSetDragging: (dragging) => this.stateUpdater.setState({
        dragging,
      }),
    });
  }

  cancelRegisterEvents = () => {
    this.dragDrop.cancelRegisterEventsFn && this.dragDrop.cancelRegisterEventsFn();
  }

  handleRemoveFile = (idx: number) => {
    this.fileHolder.handleRemoveFile(idx);
  }

  getFileList = () => this.stateUpdater.state.fileList
}

export default FileDragDrop;
