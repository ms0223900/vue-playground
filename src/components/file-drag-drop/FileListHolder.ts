/* eslint-disable no-unused-expressions */
export interface FileListHolderOptions {
  onSetFileList?: (_f: File[]) => any
}

class FileListHolder {
  _fileList: File[]

  onSetFileList?: (_f: File[]) => any

  constructor(options = {} as FileListHolderOptions) {
    this._fileList = [];
    this.onSetFileList = options.onSetFileList;
  }

  set fileList(_f: File[]) {
    this._fileList = _f;
    this.onSetFileList && this.onSetFileList(_f);
  }

  get fileList() {
    return this._fileList;
  }

  addNewFile = (files: File[]): void => {
    // console.log(this._fileList);
    this.fileList = [...this._fileList, ...files];
  }

  handleRemoveFile = (idx: number): void => {
    let _fileList = [...this._fileList];
    _fileList = [..._fileList.slice(0, idx), ..._fileList.slice(idx + 1)];
    this.fileList = _fileList;
  }

  getFileList() {
    return this.fileList;
  }
}

export default FileListHolder;
