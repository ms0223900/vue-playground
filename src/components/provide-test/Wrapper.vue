<template>
  <div>
    <p>{{ 'wrapper val: ' + val }}</p>
    <slot />
  </div>
</template>

<script>
import { computed, ref, provide } from 'vue';

export default {
  name: 'Wrapper',
  // provide() {
  //   return ({
  //     // 一定要用computed追蹤值的變化
  //     valFromWrapper: computed(() => this.val),
  //     // 一定要用arrow function，否則抓不到this
  //     updateValFromWrapper: (val) => {
  //       this.val = val;
  //     },
  //   });
  // },
  setup() {
    const val = ref('outerVal');

    const updateValFromWrapper = (_val) => {
      val.value = _val;
    };

    // 也可以用composition api
    provide('valFromWrapper', val);
    provide(updateValFromWrapper.name, updateValFromWrapper);

    return ({
      val,
    });
  },
};
</script>

<style>

</style>
