<template>
  <div>
    <div class="root">
      <input type="checkbox" :checked="checked" @change="handleRecursiveToggle" />
      <div
        :class="[
          'list-wrapper',
          { 'last-child': isChildrenEmpty },
        ]"
        :style="{
          left: `${20 * node.level}px`,
        }"
        @click="handleToggleOpen"
      >
        {{ node.val }}
        <span v-if="!isChildrenEmpty">+</span>
      </div>
    </div>
    <div v-show="isOpen">
      <RecursiveTree
        v-for="(_node, i) in node.children"
        :key="`${_node.level}-${i}`"
        :node="_node"
        :ref="setListRefs"
        @select-node="(nodePath, newChecked) => $emit('select-node', nodePath, newChecked)"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-expressions */

import Vue, {
  computed, defineComponent, onBeforeUpdate, ref,
} from 'vue';
import useSetListRef from './useSetListRef';

export default defineComponent({
  name: 'RecursiveTree',
  props: ['node', 'id'],
  setup(props, { emit }) {
    const isChildrenEmpty = computed(() => props.node.children.length === 0);

    const checked = ref(false);
    const isOpen = ref(false);

    const {
      listRefs,
      setListRefs,
    } = useSetListRef();

    const handleGetCheckedNodeInfo = () => {
      // console.log(props.node.level + props.node.val);
      if (isChildrenEmpty.value && checked.value) {
        console.log(props.node.meta);
      }
    };

    const handleToggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    const handleChecked = (toggle?: boolean) => {
      const newToggle = typeof toggle === 'boolean' ? toggle : !checked.value;
      checked.value = newToggle;
      const {
        meta: { originPath },
        children,
      } = props.node;
      children.length === 0 && emit('select-node', originPath, newToggle);
    };

    const handleRecursiveToggle = (toggle?: boolean) => {
      handleChecked(toggle);
      listRefs.value.forEach((el) => {
        if (el && el.handleRecursiveToggle) {
          el.handleRecursiveToggle(checked.value);
        }
      });
    };

    const handleRecursiveGetInfo = () => {
      handleGetCheckedNodeInfo();
      listRefs.value.forEach((el) => {
        if (el && el.handleRecursiveGetInfo) el.handleRecursiveGetInfo();
      });
    };

    return ({
      setListRefs,
      checked,
      isOpen,
      isChildrenEmpty,
      handleToggleOpen,
      handleChecked,
      handleRecursiveToggle,
      handleRecursiveGetInfo,
    });
  },

  methods: {
  },

  emits: [
    'select-node',
  ],
});
</script>

<style lang="scss" scoped>
  .root {
    display: flex;
    align-items: center;
  }
  .list-wrapper {
    position: relative;
    padding: 8px;
    margin: 4px 0px;
    background-color: #aaa;
    cursor: pointer;

    &:hover {
      background-color: #bbb;
    }

    &.last-child {
      background-color: #eee;
    }
  }
</style>
