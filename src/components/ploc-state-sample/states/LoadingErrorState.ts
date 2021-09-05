import PlocState from '../PlocState';

export interface LoadingErrorState extends Record<string, unknown> {
  loading: boolean
  error: any
}

const initState: LoadingErrorState = {
  loading: false,
  error: undefined,
};

class LoadingErrorPlocState extends PlocState<LoadingErrorState> {
  constructor(initS = initState as LoadingErrorState) {
    super(initS);
  }

  setLoading = (loading: boolean): void => {
    this.updateState((s) => ({
      loading,
    }));
  }

  setError = (error: any): void => {
    this.updateState(() => ({
      error,
    }));
  }
}

export default LoadingErrorPlocState;
