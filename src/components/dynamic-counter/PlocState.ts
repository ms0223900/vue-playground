/* eslint-disable no-underscore-dangle */
type Listner<State> = (state: State) => any

class PlocState<State> {
  _state: State

  listeners: (Listner<State>)[]

  constructor(initState: State) {
    this._state = initState;
    this.listeners = [];
  }

  updateState(newState: State): void {
    this._state = { ...this._state, ...newState };
    this.listeners.forEach((l) => {
      const listenerReturnVal = l(this._state);
      if (listenerReturnVal && typeof listenerReturnVal === 'object') {
        this._state = {
          ...this._state,
          ...listenerReturnVal,
        };
      }
    });
  }

  addlistener(listener: Listner<State>): void {
    this.listeners.push(listener);
  }

  removeListener(listener: Listner<State>): void {
    const listnerIdx = this.listeners.indexOf(listener);
    if (listnerIdx !== -1) {
      this.listeners.splice(listnerIdx, 1);
    }
  }
}

export default PlocState;
