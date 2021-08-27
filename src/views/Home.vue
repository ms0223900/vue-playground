<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <intl-text langKey="hello" />
    <recursive-list />
    <TodoListContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import IntlText from '@/components/locale/IntlText.vue';
import RecursiveList from '@/components/recursive-render/RecursiveList.vue';
import TodoListContainer from '@/components/test-toRefs-sample/TodoListContainer.vue';

export default defineComponent({
  name: 'Home',
  components: {
    IntlText,
    RecursiveList,
    TodoListContainer,
  },
});
</script>
