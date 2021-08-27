export interface TodoItemProps {
  id: string | number
  checked: boolean
  content: string
}

export interface TodoListProps {
  todoListData: TodoItemProps[]
}
