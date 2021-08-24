<template>
  <p v-bind="textProps">
    {{ localeContent }}
  </p>
</template>

<script lang="ts">
import { computed, PropType, defineComponent } from 'vue';
import {
  defaultLocale, LocaleKey, LocaleMessageKey, messages,
} from '../../locale/index';

export default defineComponent({
  name: 'IntlText',
  props: {
    langKey: {
      type: String as PropType<LocaleMessageKey>,
      default: '',
    },
    defaultLocale: ({
      type: String as PropType<LocaleKey>,
      default: () => defaultLocale,
    }),
    variables: {
      type: Object,
      default: () => ({}),
    },
    textProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return ({
      messages,
    });
  },
  // setup(props, context) {
  //   const localeContent = computed(() => {
  //     const defaultMessage = messages[props.defaultLocale][this.langKey] || this.langKey;

  //     if (!this.$t) return defaultMessage;
  //     return this.$t(this.langKey, this.variables);
  //   })
  // }
  computed: {
    localeContent(): string {
      const defaultMessage = messages[this.$props.defaultLocale][this.langKey] || this.langKey;

      if (!this.$t) return defaultMessage;
      return this.$t(this.langKey, this.$props.variables);
    },
  },
});
</script>

<style>

</style>
