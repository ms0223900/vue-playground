/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
type Callback = (params?: any) => any

const emitter = new WeakMap<any, Map<string, any[]>>();

function listenToEvent(target: any, eventType: string, listner: Callback) {
  if (!emitter.has(target)) {
    emitter.set(target, new Map());
  }

  const listners = emitter.get(target) as Map<string, any[]>;

  if (!(eventType in listners)) {
    listners.set(eventType, []);
  }

  listners.get(eventType)?.push(listner);
}

function emitEvent(target: any, eventType: string, ...params: any) {
  if (!emitter.has(target)) return;
  const listners = emitter.get(target);
  if (!listners) return;
  if (!listners.has(eventType)) return;

  listners.get(eventType)?.forEach((l) => {
    l(...params);
  });
}

const Box = (() => {
  let state = {
    count: 0,
    position: {
      x: 0,
      y: 0,
    },
  };

  function setState(newS: Partial<typeof state>) {
    state = {
      ...state,
      ...newS,
    };
  }

  function getState() {
    return state;
  }

  function getPosition() {
    return state.position;
  }

  return ({
    setState,
    getState,
    getPosition,
  });
})();

enum EventTypeEnum {
  'moveRandomly' = 'moveRandomly',
}

listenToEvent(Box, EventTypeEnum.moveRandomly, () => {
  Box.setState({
    position: { x: ~~(Math.random() * 10), y: ~~(Math.random() * 10) },
  });
  console.log(Box.getPosition());
});

emitEvent(Box, EventTypeEnum.moveRandomly);
emitEvent(Box, EventTypeEnum.moveRandomly);

const Chocolate = (() => {
  const state = {
    sweetLevel: 1,
    melted: 0, // 0 ~ 100
    meltRate: 1,
  };

  melt();

  function melt() {
    const timer = setInterval(() => {
      if (state.melted === 100) {
        clearInterval(timer);
        return;
      }
      state.melted++;
    }, state.meltRate * 1000);
  }

  function getMeltedProcess() { return state.melted; }

  return ({
    getMeltedProcess,
  });
})();

setTimeout(() => {
  console.log(
    Chocolate.getMeltedProcess(),
  );
}, 2000);
