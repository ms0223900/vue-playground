<template>
  <button @click="handleAddCount">
    {{ `+${countForAdding}` }}
  </button>
  <NumList
    :numListProps="{
      count: state.count,
      addedCount: countForAdding
    }"
  />
</template>

<script lang="ts">
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-classes-per-file */

import {
  computed,
  defineComponent, onMounted, PropType, Ref, ref, toRefs,
} from 'vue';

import * as vueRef from 'vue';
import NumList from './NumList.vue';
import usePlocState from './usePlocState';
import DynamicCounterPlocState, { DynamicCounterState } from './DynamicCounterState';

export const getRandomNum = (min = 1, max = 20) => (
  Math.round(Math.random() * (max - min)) + min
);

const initState: DynamicCounterState = {
  count: 0,
  countDigit: 0,
};

export default defineComponent({
  components: { NumList },
  name: 'DynamicCounter',
  props: [
    'initCount',
  ],
  setup(props) {
    const countForAdding = getRandomNum(50, 100);

    const ploc = new DynamicCounterPlocState(initState);
    const state = usePlocState(ploc);

    const watchCountListener = (s: DynamicCounterState) => {
      console.log(s.count);
    };

    function getCountDigit(s: DynamicCounterState) {
      return String(s.count).length;
    }

    ploc.addlistener(watchCountListener);
    ploc.addlistener((s) => ({
      digitCount: getCountDigit(s),
    }));

    return ({
      // count,
      // count: state.count,
      state,
      countForAdding,
      // handleAddCount,
      handleAddCount: () => ploc.handleAdd(countForAdding),
    });
  },
});
</script>

<style lang="scss" scoped>
</style>
