<template>
  <wrapper>
    <inner-component />
  </wrapper>
</template>

<script>
import InnerComponent from './InnerComponent.vue';
import Wrapper from './Wrapper.vue';

export default {
  name: 'ProvideTest',
  components: { Wrapper, InnerComponent },
};
</script>

<style>

</style>
