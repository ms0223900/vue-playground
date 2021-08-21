<template>
  <p v-bind="textProps">
    {{ localeContent }}
  </p>
</template>

<script lang="ts">
import { PropType } from 'vue';
import {
  defaultLocale, LocaleKey, LocaleMessageKey, messages,
} from '../../locale/index';

export default {
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
  computed: {
    localeContent(): string {
      const defaultMessage = messages[this.defaultLocale][this.langKey] || this.langKey;

      if (!this.$t) return defaultMessage;
      return this.$t(this.langKey, this.variables);
    },
  },
};
</script>

<style>

</style>
