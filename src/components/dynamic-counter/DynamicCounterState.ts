import PlocState from './PlocState';

export interface DynamicCounterState extends Record<string, unknown> {
  count: number
  countDigit: number
}

class DynamicCounterPlocState extends PlocState<DynamicCounterState> {
  constructor(state: DynamicCounterState) {
    super(state);
  }

  handleAdd(countForAdding = 1): void {
    this.updateState({
      ...this._state,
      count: this._state.count + countForAdding,
    });
  }
}

export default DynamicCounterPlocState;
