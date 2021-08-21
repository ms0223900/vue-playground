<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <intl-text langKey="hello" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import IntlText from '@/components/locale/IntlText.vue';

export default defineComponent({
  name: 'Home',
  components: {
    IntlText,
  },
});
</script>
