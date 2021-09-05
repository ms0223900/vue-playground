/* eslint-disable import/no-cycle */
import { SingleTodo } from './TodoState';

const TodoLSStorage = {
  LSKey: 'TODO_LIST_LS_DATA',

  setLS(todoListData: SingleTodo[]): void {
    localStorage.setItem(this.LSKey, JSON.stringify(todoListData));
  },

  getLS(): SingleTodo[] {
    const lsData = localStorage.getItem(this.LSKey);
    if (!lsData) return [];
    return JSON.parse(lsData);
  },
};

export default TodoLSStorage;
