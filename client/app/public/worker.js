
self.importScripts('shared.js');

let api;
let port;

const apiOptions = {

  async readBuffer(filename) {
    const response = await fetch(filename);
    return response.arrayBuffer();
  },

  // returns wasm module, for a provided wasm binary.
  async compileStreaming(filename) {
      const response = await fetch(filename);
      return WebAssembly.compile(await response.arrayBuffer());
  },
  hostWrite(s) { port.postMessage({id : 'write', data : s}); }
};

let currentApp = null;

const onAnyMessage = async event => {
  switch (event.data.id) {
  // matches when worker is initially created.
  case 'constructor':
    port = event.data.data;
    port.onmessage = onAnyMessage;
    api = new API(apiOptions);
    break;

  case 'compileLinkRun':
    if (currentApp) {
      currentApp.allowRequestAnimationFrame = false;
    }
    currentApp = await api.compileLinkRun(event.data.data);
    console.log(`finished compileLinkRun. currentApp = ${currentApp}.`);
    break;
  }



};

self.onmessage = onAnyMessage;
