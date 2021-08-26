import {
  onBeforeUpdate, ref,
} from 'vue';

const useSetListRef = () => {
  const listRefs = ref<any[]>([]);

  onBeforeUpdate(() => {
    listRefs.value = [];
  });
  const setListRefs = (el: any) => {
    if (el) listRefs.value.push(el);
  };

  return ({
    listRefs,
    setListRefs,
  });
};

export default useSetListRef;
