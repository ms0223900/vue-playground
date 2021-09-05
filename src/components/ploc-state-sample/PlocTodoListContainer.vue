<template>
  <div class="wrapper">
    <h1 v-if="apiState.error">Something wrong: {{ apiState.error }}</h1>
    <h2 v-else-if="apiState.loading">Loading...</h2>
    <template v-else>
      <button @click="handleAddTodo">
        {{ `Add ${counterState.count} Todos` }}
      </button>
      <TodoList :todoListProps="{
        todoListData: todoState.todoListData
      }"
      @update:content="handleEditTodo"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, onMounted, PropType, toRefs, watch,
} from 'vue';
import TodoList from '../test-toRefs-sample/TodoList.vue';
import {
  CounterPlocState, TodoPlocState, LoadingErrorPlocState, APIPlocState,
} from './states';
import { APIState } from './states/APIState';
import { asyncGetTodoListData, SingleTodo } from './states/TodoState';
import usePlocState from './usePlocState';

export default defineComponent({
  components: { TodoList },
  name: 'PlocTodoListContainer',
  props: [
    'count',
  ],
  setup(props) {
    const counterPloc = new CounterPlocState({ count: props.count });
    const todoPloc = new TodoPlocState();
    const apiPloc = new APIPlocState(asyncGetTodoListData);
    // const loadingErrPloc = new LoadingErrorState();

    const counterState = usePlocState(counterPloc);
    const todoState = usePlocState(todoPloc);
    const apiState = usePlocState<APIState<SingleTodo[]>>(apiPloc);
    // const loadingErrState = usePlocState(loadingErrPloc);

    const handleAddTodo = () => {
      todoPloc.handleAddTodo(counterPloc.state.count);
    };

    watch([computed(() => props.count)], () => {
      // counterPloc.updateState((s) => ({
      //   count: props.count,
      // }));
    });

    onMounted(() => {
      apiPloc.handleQuery()
        .then((res) => {
          if (res) {
            todoPloc.updateState({
              todoListData: res,
            });
          }
        });
    });

    return ({
      counterState,
      todoState,
      // loadingErrState,
      apiState,
      handleAddTodo,
      handleEditTodo: todoPloc.handleEditContent,
    });
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: left;
}
</style>
