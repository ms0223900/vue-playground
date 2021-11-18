<template>
  <div class="file-drag-drop--part" :class="{ dragging, }">
    <h1>Drag drop file Here</h1>
    {{ dragging ? 'Put file Here' : '' }}
    <button :disabled="previewFileList.length === 0" @click="handleGetFileList">Get File</button>
    <hr />
    <div class="preview-file-list--wrapper">
      <div
        v-for="(p, i) in previewFileList"
        :key="i"
        class="preview-file-item"
        :draggable="false"
        @click="handleRemoveFile(i)"
      >
        <img :src="p.src"
        :draggable="false" />
        <p>{{ p.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, toRefs,
} from 'vue';
import { FileDragDropPartProps } from './types';
import FileDragDrop from './FileDragDrop';
import readFileListAsPreviewFile, { SinglePreviewFile } from './readFileListAsPreviewFile';

export default defineComponent({
  name: 'FileDragDropPart',
  props: {
    fileDragDropPartProps: {
      type: Object as PropType<FileDragDropPartProps>,
      default: () => ({}),
    },
  },
  setup(props) {
    const dragging = ref(false);
    const previewFileList = ref<SinglePreviewFile[]>([]);

    const handleSetDragging = (_dragging: boolean) => {
      dragging.value = _dragging;
    };

    const fileDragDrop = new FileDragDrop(
      document.body, [
        ({ dragging: _d }) => handleSetDragging(!!_d),
        ({ fileList }) => {
          (async () => {
            const read = await readFileListAsPreviewFile(fileList);
            previewFileList.value = read;
          })();
        },
      ],
    );
    fileDragDrop.init(document.body);

    const {
      handleRemoveFile,
      getFileList,
    } = fileDragDrop;

    const handleGetFileList = () => {
      console.log(getFileList());
    };

    return ({
      dragging,
      previewFileList,
      handleRemoveFile,
      handleGetFileList,
    });
  },
});
</script>

<style lang="scss" scoped>
.file-drag-drop--part {
  // display: flex;
  // align-items: center;
  min-width: 100vw;
  min-height: 50vh;
  background-color: #ddd;

  &.dragging {
    background-color: #ccc;
  }

  .preview-file-list--wrapper {
    display: flex;
    flex-wrap: wrap;
    .preview-file-item {
      padding: 0.5rem;
      max-width: 200px;
      cursor: pointer;
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
