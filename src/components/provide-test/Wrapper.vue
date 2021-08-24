<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'Wrapper',
  provide() {
    return ({
      valFromWrapper: computed(() => this.val),
    });
  },
  setup() {
    const val = ref('outerVal');

    return ({
      val,
    });
  },
};
</script>

<style>

</style>
