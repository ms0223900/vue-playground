<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    {{ label }}
    <intl-text langKey="hello" :style="{ fontSize: '30px', }" />
  </button>
</template>

<script>
import './button.css';
import { reactive, computed } from 'vue';
import IntlText from '../components/locale/IntlText.vue';

export default {
  components: { IntlText },
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator(value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const innerProps = reactive(props);
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': innerProps.primary,
        'storybook-button--secondary': !innerProps.primary,
        [`storybook-button--${innerProps.size || 'medium'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: innerProps.backgroundColor,
      })),
      onClick() {
        emit('click');
      },
    };
  },
};
</script>
