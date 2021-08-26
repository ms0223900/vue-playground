<template>
  <div>
    <button @click="handleGetInnerTreeInfos">
      Outer Trigger Button
    </button>
    <recursive-tree
      v-for="(node, i) in parsedNodeList"
      :key="i"
      :node="node"
      :ref="setListRefs"
    />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import DataNodeParser from './DataNodeParser';
import RecursiveTree from './RecursiveTree.vue';
import Button from '@/stories/Button.vue';
import useSetListRef from './useSetListRef';

const pathListData = [
  'a/b/c',
  'a/b/d',
  'b/c/d',
  'b/c/e',
  'c/d/a',
  'c/d/b',
  'c/d/e/f',
  'c/d/e/g',
  'c/d/e/h',
];

export default {
  components: { RecursiveTree },
  name: 'RecursiveList',
  setup() {
    const parsedNodeList = computed(() => (
      DataNodeParser.parseToDataNode(pathListData)
    ));

    const {
      listRefs,
      setListRefs,
    } = useSetListRef();

    const handleGetInnerTreeInfos = () => {
      listRefs.value.forEach((el) => {
        if (el && el.handleRecursiveGetInfo) el.handleRecursiveGetInfo();
      });
    };

    return ({
      parsedNodeList,
      setListRefs,
      handleGetInnerTreeInfos,
    });
  },
};
</script>

<style>

</style>
