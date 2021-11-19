<template>
  <div ref="partRef" class="scroll-trigger-part">
    <h1>Scroll Trigger Part</h1>
    <div
      v-for="(a, i) in Array(10).fill(0)"
      class="box"
      :key="i"
      :class="[`box-${i}`]"
    >
      {{ `Part ${i}` }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, PropType, ref, toRefs,
} from 'vue';
import ScrollTrigger, { SingleTriggerElOptions } from './ScrollTrigger';
// import { ScrollTriggerPartProps } from './types';

export default defineComponent({
  name: 'ScrollTriggerPart',
  // props: {
  //   ScrollTriggerPartProps: {
  //     type: Object as PropType<ScrollTriggerPartProps>,
  //     default: () => ({}),
  //   },
  // },
  setup(props) {
    const partRef = ref<HTMLElement>();

    onMounted(() => {
      console.log(partRef.value);
      if (partRef.value) {
        const partEl = partRef.value;
        const scrollTrigger = new ScrollTrigger(
          // partRef.value,
          document.body,
        );
        const boxList = document.getElementsByClassName('box');
        const els = [...boxList] as HTMLElement[];
        const elOptionList: SingleTriggerElOptions[] = els.map((el, i) => ({
          el,
          elPosToTrigger: {
            top: i * 300,
          },
          triggerFns: [
            {
              cb: () => {
                el.classList.add('active');
              },
            },
          ],
        }));
        scrollTrigger.addTriggerEl(elOptionList);
      }
    });
    return ({
      partRef,
      // ...toRefs(props.ScrollTriggerPartProps),
    });
  },
});
</script>

<style lang="scss" scoped>
@keyframes colorChanging {
  0% {
    background-color: #ddd;
  }

  100% {
    background-color: #111;
  }
}

.scroll-trigger-part {
  .box {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: #ddd;
    margin-bottom: 1rem;
    transition: 0.8s;

    @for $i from 0 through 10 {
      @if $i % 2 == 0 {
        &-#{$i} {
          left: 100%;
        }
      }

      @if $i % 2 == 1 {
        &-#{$i} {
          left: -100%;
        }
      }

      &-#{$i} {
        &.active {
          left: 0;
        }
      }
    }

    &-1.active {
      // animation: colorChanging 1s forwards;
      background-color: #333;
      transition: 1s;
    }

    &-2 {
      left: -100%;
      transition: 1s;
      &.active {
        left: 0;
      }
    }

    &-3 {
      left: 100%;
      transition: 1s;
      &.active {
        left: 0;
      }
    }

    &-4 {
      left: -50%;
      transition: 1s 0.5s;
      &.active {
        left: 0;
      }
    }

    &-5 {
      left: 100%;
      transition: 1s;
      &.active {
        left: 0;
      }
    }
  }
}
</style>
