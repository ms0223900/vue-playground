/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

type Callback = (...params: any) => any
export interface SingleTriggerElOptions {
  el: HTMLElement
  elPosToTrigger?: {
    top?: number
    left?: number
  }
  triggered?: boolean
  triggerFns?: {
    triggerOnce?: boolean
    cb: Callback
  }[]
}

const debounce = (cb: Callback, debounceTime = 10) => {
  let timer: number | undefined;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      cb();
      timer = undefined;
    }, debounceTime);
  };
};

class ScrollTrigger {
  cancelListenScroll?: any

  elForListeningScroll: HTMLElement

  elList: SingleTriggerElOptions[]

  constructor(elForListeningScroll: HTMLElement, elListOptions?: SingleTriggerElOptions[]) {
    this.elForListeningScroll = elForListeningScroll;
    this.elList = elListOptions || [];
    this.init();
  }

  private getWrapperElScrollSpecs() {
    const {
      scrollTop,
      scrollLeft,
      clientTop,
    } = this.elForListeningScroll;
    const elSpec = this.elForListeningScroll.getBoundingClientRect();
    // console.log(
    //   this.elForListeningScroll.scrollTop,
    //   window.scrollY,
    // );
    return ({
      scrollTop: window.scrollY,
      scrollLeft: window.scrollX,
    });
  }

  addTriggerEl(elOptionsList: SingleTriggerElOptions[]) {
    this.elList = [...this.elList, ...elOptionsList];
    this.cancelListenScroll && this.cancelListenScroll();
    this.registerEvents();
  }

  private setElTriggered(idx: number) {
    this.elList[idx].triggered = true;
  }

  private checkElToTrigger(elOptions: SingleTriggerElOptions, idx: number) {
    const {
      el,
      elPosToTrigger,
      triggered,
      triggerFns,
    } = elOptions;
    if (triggered) return;

    const elSpec = el.getBoundingClientRect();
    // console.log(elSpec);
    const elTop = elPosToTrigger?.top;
    const elLeft = elPosToTrigger?.left;
    const {
      scrollTop, scrollLeft,
    } = this.getWrapperElScrollSpecs();
    console.log(scrollTop, elTop);

    if (typeof elTop === 'number' && scrollTop >= elTop) {
      this.setElTriggered(idx);
      triggerFns && triggerFns.forEach((fn) => {
        fn.cb();
      });
    }
    if (typeof elLeft === 'number' && scrollLeft >= elLeft) {
      this.setElTriggered(idx);
      triggerFns && triggerFns.forEach((fn) => {
        fn.cb();
      });
    }
  }

  private registerEvents() {
    const listenCheckCb = debounce((e) => {
      this.elList.forEach((el, i) => {
        this.checkElToTrigger(el, i);
      });
    }, 500);
    window.addEventListener('scroll', listenCheckCb);

    this.cancelListenScroll = () => {
      window.removeEventListener('scroll', listenCheckCb);
    };
  }

  private init() {
    this.registerEvents();
  }
}

export default ScrollTrigger;
