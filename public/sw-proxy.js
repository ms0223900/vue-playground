/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-this-alias */
const self = this;
self.importScripts('./sw-response.js');

const getDelayedResponse = (response = {}, delay = 100) => new Promise((res) => {
  setTimeout(() => {
    res(response);
  }, delay);
});

const composeFnsChcker = (...fns) => (...params) => fns.some((fn) => fn(params));
const getAllPatternUrlRegExp = (url = '') => (
  new RegExp(url.replace('*', '(.+)'))
);

const UrlMatchHelpers = {
  exactMatch: (url, method) => ({ reqUrl, reqMethod }) => (
    url === reqUrl && method === reqMethod
  ),

  patternMatch: (url = '*', method = 'get') => ({ reqUrl, reqMethod }) => (
    url.includes('*')
    && method.toLocaleLowerCase() === reqMethod.toLocaleLowerCase()
    && getAllPatternUrlRegExp(reqUrl).test(url)
  ),
};

const getResponse = (url, method) => {
  const exactMatch = UrlMatchHelpers.exactMatch(url, method);
  const patternMatch = UrlMatchHelpers.patternMatch(url, method);
  // responseList from sw-response.js
  return responseList.find(
    composeFnsChcker(exactMatch, patternMatch),
  );
};

const makeProxyResponse = (responseFromStatic, reqMethod) => {
  const {
    headers,
    status,
    statusText,
    resMethod,
    reqUrl,
    redirectUrl: _redirectUrl,
    file,
    body,
  } = responseFromStatic;

  const initHeader = {
    headers, status, statusText, url: reqUrl, method: resMethod || reqMethod,
  };
  const redirectUrl = reqUrl.includes('*')
    ? reqUrl.replace(getAllPatternUrlRegExp(reqUrl), _redirectUrl)
    : _redirectUrl;

  if (file) return fetch(`${self.origin}/${file}`);
  if (redirectUrl) return fetch(redirectUrl, initHeader);

  return Promise.resolve(
    new Response(JSON.stringify(body)),
  );
};

class SWProxy {
  constructor(delay = 10) {
    this.resDelay = delay;
  }

  handleFetch = async (e) => {
    const {
      request: {
        method,
        url,
      },
    } = e;
    console.log(e);

    const res = getResponse(url, method);

    if (res) {
      const proxyRes = makeProxyResponse(res);
      e.waitUntil(
        Promise.resolve(
          e.respondWith(getDelayedResponse(proxyRes, this.resDelay)),
        ),
      );
    } else {
      e.respondWith(
        Promise.resolve(
          new Response(JSON.stringify({ message: 'not-found' }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          }),
        ),
      );
    }
  }

  handleInstall = () => {
    console.log('SW installed.');
    self.skipWaiting();
  }

  handleActivate = () => {
    console.log('SW activated.');
    return self.clients.claim();
  }

  init() {
    console.log('SW proxy init');
    self.addEventListener('fetch', this.handleFetch);
    self.addEventListener('install', this.handleInstall);
    self.addEventListener('activate', this.handleActivate);
  }
}

const swProxy = new SWProxy(100);
swProxy.init();
