type Listner<State> = (s: State) => any

class StateUpdater<State> {
  listners: Listner<State>[]

  state: State

  constructor(initState: State, listners?: Listner<State>[]) {
    this.listners = [
      ...listners || [],
    ];
    this.state = {
      ...initState,
    };
  }

  setState(_s: ((s: State) => Partial<State>) | Partial<State>): void {
    const newS = typeof _s === 'function' ? _s(this.state) : _s;
    this.state = {
      ...this.state,
      ...newS,
    };
    this.listners.forEach((l) => l(this.state));
  }

  addListner(listners?: Listner<State>[]) {
    if (!listners) return;
    this.listners = [
      ...this.listners,
      ...listners,
    ];
  }
}

export default StateUpdater;
