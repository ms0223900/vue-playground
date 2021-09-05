import PlocState from '../PlocState';
import LoadingErrorPlocState, { LoadingErrorState } from './LoadingErrorState';

type QueryFn<Data> = (...params: any) => Promise<Data>

export interface APIState<Data> extends LoadingErrorState {
  data?: Data
  queryFn?: QueryFn<Data>
}

class APIPlocState<Data> extends LoadingErrorPlocState {
  declare _state: APIState<Data>;

  public get state(): APIState<Data> {
    return this._state;
  }

  constructor(queryFn?: QueryFn<Data>) {
    super();
    this._state.queryFn = queryFn;
  }

  async handleQuery(params?: any): Promise<Data | undefined> {
    try {
      if (this.state.queryFn) {
        this.setLoading(true);
        const res = await this.state.queryFn(params);
        this.updateState((s) => ({
          data: res,
          loading: false,
        }));
        return res;
      }
    } catch (error) {
      this.setError(error);
    }
    return undefined;
  }
}

export default APIPlocState;
