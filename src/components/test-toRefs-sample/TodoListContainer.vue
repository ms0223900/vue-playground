<template>
  <TodoList
    :todoListProps="todoListProps"
    @update:checkbox="handleToggleChecked"
    @update:content="handleEditContent"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, reactive, ref, toRefs,
} from 'vue';
import TodoList from './TodoList.vue';
import { TodoItemProps } from './types';
// import { TodoListContainerProps } from './types';

export const getIdx = (id: number, todoList: TodoItemProps[]) => (
  todoList.findIndex((t) => t.id === id)
);

export default defineComponent({
  components: { TodoList },
  name: 'TodoListContainer',
  props: {
    TodoListContainerProps: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  setup(props) {
    const todoListData = reactive([
      {
        id: 0,
        checked: false,
        content: 'aabc',
      },
      {
        id: 1,
        checked: false,
        content: 'aabc',
      },
    ]);

    const handleToggleChecked = (id: number) => {
      // console.log(id);
      const idx = getIdx(id, todoListData);

      if (idx !== -1) {
        todoListData[idx] = {
          ...todoListData[idx],
          checked: !todoListData[idx].checked,
        };
      }
    };

    const handleEditContent = (id: number, val: string) => {
      // console.log(id, val);
      const idx = getIdx(id, todoListData);

      if (idx !== -1) {
        todoListData[idx] = {
          ...todoListData[idx],
          content: val,
        };
      }
    };

    const todoListProps = computed(() => ({
      todoListData,
    }));

    return ({
      // ...toRefs(props.TodoListContainerProps),
      todoListProps,
      handleToggleChecked,
      handleEditContent,
    });
  },
});
</script>

<style lang="scss" scoped>
</style>
