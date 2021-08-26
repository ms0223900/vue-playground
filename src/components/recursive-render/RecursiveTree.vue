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
      <recursive-tree
        v-for="(_node, i) in node.children"
        :key="`${_node.level}-${i}`"
        :node="_node"
        :ref="setListRefs"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {
  computed, defineComponent, onBeforeUpdate, ref,
} from 'vue';
import useSetListRef from './useSetListRef';

export default defineComponent({
  name: 'RecursiveTree',
  props: ['node'],
  setup(props) {
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

    const handleChecked = () => {
      checked.value = !checked.value;
    };

    const handleRecursiveToggle = () => {
      handleChecked();
      listRefs.value.forEach((el) => {
        if (el && el.handleRecursiveToggle) el.handleRecursiveToggle();
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
