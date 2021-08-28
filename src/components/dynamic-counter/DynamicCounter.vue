<template>
  <button @click="handleAddCount">
    {{ `+${countForAdding}` }}
  </button>
  <NumList
    :numListProps="{
      count,
      addedCount: countForAdding
    }"
  />
</template>

<script lang="ts">
import {
  defineComponent, onMounted, PropType, ref, toRefs,
} from 'vue';
import NumList from './NumList.vue';

export const getRandomNum = (min = 1, max = 20) => (
  Math.round(Math.random() * (max - min)) + min
);

const initCount = 0;

export default defineComponent({
  components: { NumList },
  name: 'DynamicCounter',
  props: {
    // DynamicCounterProps: {
    //   type: Object as PropType<DynamicCounterProps>,
    //   default: () => ({}),
    // },
  },
  setup(props) {
    const countForAdding = getRandomNum(50, 50);
    const count = ref(initCount);

    const handleAddCount = () => {
      count.value += countForAdding;
    };

    onMounted(() => {
      // setInterval(() => {
      //   handleAddCount();
      // }, 100);
    });

    return ({
      count,
      countForAdding,
      handleAddCount,
    });
  },
});
</script>

<style lang="scss" scoped>
</style>
