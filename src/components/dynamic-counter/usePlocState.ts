import {
  reactive, ref, onMounted, onUnmounted, readonly,
} from 'vue';
import PlocState from './PlocState';

const usePlocState = <S extends Record<string, unknown>>(ploc: PlocState<S>) => {
  const state = ref(ploc._state);

  const listner = (newState: S) => {
    state.value = newState;
  };

  onMounted(() => {
    ploc.addlistener(listner);
  });

  onUnmounted(() => {
    ploc.removeListener(listner);
  });

  return readonly(state);
};

export default usePlocState;
