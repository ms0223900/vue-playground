import DataNode from './Node';

const DataNodeParser = {
  parseStrToArr: (path: string): string[] => path.split('/'),

  parseToDataNode(pathList: string[]): DataNode[] {
    const res: DataNode[] = [];

    pathList.forEach((path) => {
      const parsedPath = this.parseStrToArr(path);
      let currentNodeList = res;

      parsedPath.forEach((pathVal, i) => {
        const foundNode = currentNodeList.find((r) => r.val === pathVal);
        const newNode = new DataNode(pathVal, i, {
          originPath: path,
        });

        if (foundNode) {
          currentNodeList = foundNode.children;
        } else {
          currentNodeList.push(newNode);
          currentNodeList = newNode.children;
        }
      });
    });

    console.log(res);

    return res;
  },
};

export default DataNodeParser;
