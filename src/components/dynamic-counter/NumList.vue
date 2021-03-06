<template>
  <div class="num-list-wrapper">
    <num-item
      v-for="(num, i) in parsedNumList"
      :key="parsedNumList.length - i"
      :numItemProps="{
        numNow: num,
        addedCount,
        numTransitionTimeSec: (addedIdx === addedCount) ? numTransitionTimeSec : (
          numTransitionTimeSec * (10 ** (parsedNumList.length - i - 1))
        ),
        digit: parsedNumList.length - i
      }"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */

import {
  computed, defineComponent, PropType, ref, toRefs, watch,
} from 'vue';
import NumItem from './NumItem.vue';
import { NumListProps } from './types';

const defaultSingleNumTransitionSec = 0.5;

export const asyncTimeoutCb = (cb: any, timeoutTime = 0.1) => (
  new Promise((res) => {
    setTimeout(() => {
      if (cb) cb();
      res('');
    }, timeoutTime * 1000);
  })
);

export const getNumTransitionTimeSec = (wholeTransitionSec = 0.2, addedCount = 10, addedIdx = 5) => {
  if (addedCount < 10) return wholeTransitionSec / addedCount;
  if (addedIdx > addedCount - 2) return wholeTransitionSec / 0.8;
  if (addedIdx > addedCount - 3) return wholeTransitionSec / 1.5;
  const multi = 1;
  // const multi = Math.floor(addedCount / 10) * 0.5;
  return (wholeTransitionSec * (1 + multi)) / addedCount;
};

export const splitNum = (num: number) => (
  String(num).split('').map((c) => Number(c))
);

export default defineComponent({
  components: { NumItem },
  name: 'NumList',
  props: {
    numListProps: {
      type: Object as PropType<NumListProps>,
      default: () => ({}),
    },
  },
  setup(props) {
    const nextCount = ref(props.numListProps.count);
    const count = computed(() => (
      props.numListProps.count
    ));
    const addedCount = computed(() => (
      props.numListProps.addedCount
    ));
    const parsedNumList = computed(() => (
      splitNum(nextCount.value)
    ));
    const numTransitionTimeSec = ref((
      getNumTransitionTimeSec(defaultSingleNumTransitionSec, props.numListProps.addedCount)
    ));

    const addedIdx = ref(0);
    watch([count, addedCount], () => {
      addedIdx.value = 0;
      (async () => {
        for await (const el of Array(addedCount.value).fill(0)) {
          addedIdx.value += 1;
          await asyncTimeoutCb(() => {
            nextCount.value += 1;
          }, numTransitionTimeSec.value);
          numTransitionTimeSec.value = getNumTransitionTimeSec(
            defaultSingleNumTransitionSec, props.numListProps.addedCount, addedIdx.value,
          );
        }
      })();
    });

    return ({
      ...toRefs(props.numListProps),
      parsedNumList,
      addedCount,
      addedIdx,
      numTransitionTimeSec,
    });
  },
});
</script>

<style lang="scss" scoped>
.num-list-wrapper {
  display: flex;
}
</style>
