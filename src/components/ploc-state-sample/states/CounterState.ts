import PlocState from '../PlocState';

export interface CounterState extends Record<string, unknown> {
  count: number
}

class CounterPlocState extends PlocState<CounterState> {
  constructor(initS: CounterState) {
    super(initS);
  }

  handleAdd(diff = +2): void {
    this.updateState((s) => ({
      count: s.count + diff,
    }));
  }
}

export default CounterPlocState;
