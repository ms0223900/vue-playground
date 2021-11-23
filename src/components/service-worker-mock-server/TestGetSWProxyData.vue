<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ `Error: ${error}` }}</div>
    <hr />
    <div class="render-content">
      <h1>Rendered: </h1>
      {{ JSON.stringify(response) }}
    </div>
    <button
      @click="handleFetchPosts"
    >
      Get Posts
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import useTestGetSWProxyData from './functions/useTestGetSWProxyData';
// import { TestGetSWProxyDataProps } from './types';

export default defineComponent({
  name: 'TestGetSWProxyData',
  // props: {
  //   TestGetSWProxyDataProps: {
  //     type: Object as PropType<TestGetSWProxyDataProps>,
  //     default: () => ({}),
  //   },
  // },
  setup(props) {
    const {
      loading,
      error,
      response,
      handleFetchPosts,
    } = useTestGetSWProxyData();

    return ({
      loading,
      error,
      response,
      handleFetchPosts,
    });
  },
});
</script>

<style lang="scss" scoped>
</style>
