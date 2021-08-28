<template>
  <div class="wrapper">
    <div class="num-item-wrapper" :style="numItemWrapperStyle">
      <div>{{ _numNow }}</div>
      <div v-if="typeof nextNum === 'number'" >{{ nextNum }}</div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */

import {
  computed, CSSProperties, defineComponent, PropType, reactive, ref, StyleHTMLAttributes, toRefs, watch,
} from 'vue';
import { asyncTimeoutCb, getNumTransitionTimeSec } from './NumList.vue';
import { NumItemProps } from './types';
import { defaultSingleNumTransitionSec } from './config';

export const getNextNum = (num: number) => (
  (num + 1) % 10
);

export default defineComponent({
  name: 'NumItem',
  props: {
    numItemProps: {
      type: Object as PropType<NumItemProps>,
      default: () => ({}),
    },
  },
  setup(props) {
    const numNow = computed(() => (
      props.numItemProps.numNow
    ));
    const _numNow = ref(numNow.value);
    const numItemWrapperStyle = ref<CSSProperties>({});
    const nextNum = ref(1);

    watch([numNow], () => {
      // const { addedCount, digit } = props.numItemProps;

      (async () => {
        const { numTransitionTimeSec } = props.numItemProps;
        numItemWrapperStyle.value = {
          transition: `${numTransitionTimeSec}s`,
          top: '-40px',
        };

        await asyncTimeoutCb(() => {
          nextNum.value = getNextNum(_numNow.value);
          _numNow.value = numNow.value;
          numItemWrapperStyle.value = {
            top: '0px',
            transition: 'unset',
          };
        }, numTransitionTimeSec);
      })();
    });

    return ({
      nextNum,
      numNow,
      _numNow,
      numItemWrapperStyle,
      // ...toRefs(props.numItemProps),
    });
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  // outline: 1px solid #d00;
  width: 40px;
  height: 40px;
  overflow: hidden;

  .num-item-wrapper {
    position: relative;
    top: 0px;
    div {
      // outline: 1px solid #d00;
      display: flex;
      justify-content: center;
      align-items: center;
      // width: 60px;
      height: 38px;
      font-size: 30px;
      font-weight: bold;
      background-color: #fff;
    }
  }
}
</style>
