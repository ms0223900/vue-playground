/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import PlocState from '../PlocState';
import TodoLSStorage from './TodoLSStorage';

export interface SingleTodo {
  id: number
  checked: boolean
  content: string
}

const getIdx = (id: number, todoList: SingleTodo[]) => (
  todoList.findIndex((t) => t.id === id)
);

export interface TodoState extends Record<string, unknown> {
  latestId: number
  todoListData: SingleTodo[]
}

const initTodoState: TodoState = {
  latestId: 0,
  todoListData: [
    {
      id: 0,
      checked: false,
      content: 'hi',
    },
  ],
};

export const asyncGetTodoListData = async (): Promise<SingleTodo[]> => {
  const listFromLS = TodoLSStorage.getLS();
  const listData = listFromLS.length ? listFromLS : initTodoState.todoListData;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() > 0.95) {
        rej(new Error('Get todo failed :('));
      }
      res(listData);
    }, 1500);
  });
};

class TodoPlocState extends PlocState<TodoState> {
  constructor(initS = initTodoState) {
    super(initS);
    this.addlistener((s) => TodoLSStorage.setLS(s.todoListData));
  }

  static makeSingleTodo(id: number, content = ''): SingleTodo {
    return ({
      id,
      checked: false,
      content,
    });
  }

  static makeNewTodoList(latestId: number, todoAmount = 1): SingleTodo[] {
    return Array(todoAmount).fill(0).map((t, idx) => (
      TodoPlocState.makeSingleTodo(latestId + idx + 1, '')
    ));
  }

  async handleAsyncGetTodoListData(errorCb?: (error: any) => any): Promise<SingleTodo[]> {
    try {
      const res = await asyncGetTodoListData();
      this.updateState((s) => ({
        todoListData: res,
      }));
      return res;
    } catch (error: any) {
      errorCb && errorCb(error);
      throw error;
    }
  }

  handleAddTodo(todoAmount = 1): void {
    this.updateState((s) => ({
      todoListData: [
        ...s.todoListData,
        ...TodoPlocState.makeNewTodoList(s.latestId, todoAmount),
      ],
      latestId: s.latestId + todoAmount,
    }));
  }

  handleEditContent = (id: number, content: string): void => {
    const newTodoList = [...this.state.todoListData];
    const idx = getIdx(id, this.state.todoListData);

    if (idx !== -1) {
      newTodoList[idx] = {
        ...newTodoList[idx],
        content,
      };
    }

    this.updateState((s) => ({
      todoListData: newTodoList,
    }));
  }
}

export default TodoPlocState;
