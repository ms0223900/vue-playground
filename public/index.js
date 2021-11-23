const SW_PROXY_PATH = './sw-proxy.js';

function registerServiceWorkerProxy() {
  if (navigator.serviceWorker) {
    // console.log('register SW proxy');
    navigator.serviceWorker.register(SW_PROXY_PATH, {
      // scope: '/',
    });
    navigator.serviceWorker.ready
      .then(() => {
        console.log('SW Proxy Ready.');
      });
  }
}

registerServiceWorkerProxy();
