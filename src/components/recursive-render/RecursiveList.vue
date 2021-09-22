<template>
  <div>
    <button :disabled="loading" @click="handleGetSelectedNodeList">
      Outer Trigger Button
    </button>
    <RecursiveTree
      v-for="(node, i) in parsedNodeList"
      :key="i"
      :node="node"
      :ref="setListRefs"
      @select-node="handleSelectNode"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */

import { computed, ref } from 'vue';
import DataNodeParser from './DataNodeParser';
import RecursiveTree from './RecursiveTree.vue';
import Button from '@/stories/Button.vue';
import useSetListRef from './useSetListRef';
import autoDownloadFile from '@/utils/functions/autoDownloadFile';

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
    const loading = ref(false);
    const selectedNodeList = ref<string[]>([]);

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

    const handleRemoveNode = (nodePath: string) => {
      selectedNodeList.value = selectedNodeList.value.filter((l) => l !== nodePath);
    };
    const handleAppendNode = (nodePath: string) => {
      selectedNodeList.value = [
        ...selectedNodeList.value,
        nodePath,
      ];
    };

    const handleSelectNode = (nodePath: string, checked?: boolean) => {
      if (typeof checked === 'boolean') {
        if (checked) {
          handleAppendNode(nodePath);
        } else {
          handleRemoveNode(nodePath);
        }
      } else if (selectedNodeList.value.includes(nodePath)) {
        handleRemoveNode(nodePath);
      } else {
        handleAppendNode(nodePath);
      }
    };

    const handleGetSelectedNodeList = () => {
      // console.log(selectedNodeList.value);
      (async () => {
        loading.value = true;
        for await (const nodePath of selectedNodeList.value) {
          await autoDownloadFile(nodePath);
        }
        loading.value = false;
      })();
    };

    return ({
      loading,
      parsedNodeList,
      setListRefs,
      handleSelectNode,
      handleGetInnerTreeInfos,
      handleGetSelectedNodeList,
    });
  },
};
</script>

<style>

</style>
