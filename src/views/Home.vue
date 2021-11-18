<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <intl-text langKey="hello" />
    <DynamicCounter />
    <recursive-list />
    <ploc-todo-list-container :count="count" />
    <file-drag-drop-part />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import IntlText from '@/components/locale/IntlText.vue';
import RecursiveList from '@/components/recursive-render/RecursiveList.vue';
import TodoListContainer from '@/components/test-toRefs-sample/TodoListContainer.vue';
import DynamicCounter from '@/components/dynamic-counter/DynamicCounter.vue';
import PlocTodoListContainer from '@/components/ploc-state-sample/PlocTodoListContainer.vue';
import FileDragDropPart from '@/components/file-drag-drop/FileDragDropPart.vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const count = ref(1);

    onMounted(() => {
      setInterval(() => {
        count.value += 1;
      }, 1000);
    });

    return ({
      count,
    });
  },
  components: {
    // HelloWorld,
    IntlText,
    RecursiveList,
    // TodoListContainer,
    DynamicCounter,
    PlocTodoListContainer,
    FileDragDropPart,
  },
});
</script>
,
    FileDragDropPart
