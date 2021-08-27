<template>
  <div class="todo-item-wrapepr">
    <input :checked="todoItemProps.checked" type="checkbox" @change="$emit('update:checkbox')" />
    <input
      type="text"
      :value="todoItemProps.content"
      :disabled="todoItemProps.checked"
      @input="e => $emit('update:content', e.target.value)"
    />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, reactive, toRef, toRefs, watch,
} from 'vue';
import { TodoItemProps } from './types';

export default defineComponent({
  name: 'TodoItem',
  props: {
    todoItemProps: {
      type: Object as PropType<TodoItemProps>,
      default: () => ({}),
    },
  },
  setup(props) {
    const todoItemProps = computed(() => props.todoItemProps);

    return ({ ...toRefs(todoItemProps) });
  },
  emits: [
    'update:checkbox',
    'update:content',
  ],
});
</script>

<style lang="scss" scoped>
.todo-item-wrapepr {
  display: flex;
  align-items: center;
}
</style>
