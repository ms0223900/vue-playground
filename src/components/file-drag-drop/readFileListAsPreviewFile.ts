/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
export interface SinglePreviewFile {
  name: string
  src: string
}

const readSingleFileAsPreviewFile = (file: File): Promise<SinglePreviewFile> => {
  const reader = new FileReader();
  const fileName = file.name;

  return new Promise((res, rej) => {
    reader.onload = (e) => {
      if (e.target) {
        res({
          src: e.target.result as string,
          name: fileName,
        });
      } else {
        rej(
          new Error('read file failed'),
        );
      }
    };
    reader.readAsDataURL(file);
  });
};

const readFileListAsPreviewFile = async (fileList?: FileList | File[]) => {
  if (!fileList) return [];
  const _files = [...fileList];
  let res: SinglePreviewFile[] = [];
  try {
    for await (const file of _files) {
      const readFile = await readSingleFileAsPreviewFile(file);
      res = [...res, readFile];
    }
  } catch (error) {
    console.log(error);
  }
  return res;
};

export default readFileListAsPreviewFile;
