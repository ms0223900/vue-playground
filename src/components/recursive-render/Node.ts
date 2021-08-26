/* eslint-disable lines-between-class-members */
class DataNode {
  val: any
  meta: any
  level: number
  children: DataNode[]

  constructor(val: any, level = 0, meta = {}) {
    this.val = val;
    this.level = level;
    this.children = [];
    this.meta = meta;
  }

  appendChild(child: DataNode): void {
    this.children.push(child);
  }
}

export default DataNode;
