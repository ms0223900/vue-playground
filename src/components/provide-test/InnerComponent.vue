<template>
  <input :value="valFromWrapper.value"
  @change="valFromWrapper = $event.target.value" />
  <input
    :value="innerVal"
    @change="innerVal = $event.target.value"
  />
</template>

<script>
export default {
  name: 'InnerComponent',
  data() {
    return ({
      innerVal: '',
    });
  },
  inject: [
    'valFromWrapper',
  ],
};
</script>

<style>

</style>
