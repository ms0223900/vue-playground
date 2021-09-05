<template>
  <TodoItem
    v-for="(todo) in (todoListProps.todoListData)"
    :key="todo.id"
    :todoItemProps="reactive(todo)"
    @update:checkbox="$emit('update:checkbox', todo.id)"
    @update:content="val => $emit('update:content', todo.id, val)"
  />
</template>

<script lang="ts">
import {
  defineComponent, PropType, reactive, toRef, toRefs,
} from 'vue';
import TodoItem from './TodoItem.vue';
import { TodoListProps } from './types';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem,
  },
  props: {
    todoListProps: {
      type: Object as PropType<TodoListProps>,
      default: () => ({}),
    },
  },
  setup(props) {
    const {
      todoListData,
    } = toRefs(props.todoListProps);
    return ({
      todoListData,
      reactive,
    });
  },
  emits: [
    'update:checkbox',
    'update:content',
  ],
});
</script>

<style lang="scss" scoped>
</style>
