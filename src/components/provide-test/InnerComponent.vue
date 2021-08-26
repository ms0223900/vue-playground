<template>
  <input :value="valFromWrapper.value"
  @input="$e => updateValFromWrapper($e.target.value)" />
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
    'updateValFromWrapper',
  ],
};
</script>

<style>

</style>
