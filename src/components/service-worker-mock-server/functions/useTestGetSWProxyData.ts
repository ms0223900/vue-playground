/* eslint-disable no-unused-expressions */
import { ref } from 'vue';

const fetchCompose = (setLoadingFn: any, setErrorFn: any, setResFn?: any) => (fetchFn: any) => async () => {
  try {
    setLoadingFn(true);
    const data = await fetchFn();
    setResFn && setResFn(data);
    setLoadingFn(false);
    return data;
  } catch (_error) {
    setLoadingFn(false);
    setErrorFn(_error);
  }
  return undefined;
};
const fetchPosts = () => window.fetch('/abc', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((res) => res.json());

const useTestGetSWProxyData = () => {
  const loading = ref(false);
  const error = ref<any>();
  const response = ref<any>();

  const fetchUpdater = fetchCompose(
    (_l: boolean) => { loading.value = _l; },
    (_e: any) => { error.value = _e; },
    (_r: any) => { error.value = _r; },
  );

  const handleFetchPosts = fetchUpdater(fetchPosts);

  return ({
    loading,
    error,
    response,
    handleFetchPosts,
  });
};

export default useTestGetSWProxyData;
