
class WorkerAPI {
  constructor() {
    this.nextResponseId = 0;
    this.responseCBs = new Map();
    this.worker = new Worker('../worker.js');
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.port.onmessage = this.onmessage.bind(this);
    this.output = null;

    const remotePort = channel.port2;
    // pass the remortPort to the worker along with the object.
    this.worker.postMessage({id: 'constructor', data: remotePort},
                            [remotePort]);
  }

  terminate() {
    this.worker.terminate();
  }

  async runAsync(id, options) {
    const responseId = this.nextResponseId++;
    const responsePromise = new Promise((resolve, reject) => {
      this.responseCBs.set(responseId, {resolve, reject});
    });
    this.port.postMessage({id, responseId, data : options});
    return await responsePromise;
  }

  compileLinkRun(contents) {
    // ask the worker to compile-Link-and-run the content.
    this.port.postMessage({id: 'compileLinkRun', data: contents});
  }

  async getOutput(){
    return this.output;
  }

  // this is called when an message is sent back from `remotePort`.
  async onmessage(event) {
    switch (event.data.id) {
      case 'write':
        let op = document.getElementById("output");

        if (op != null){
          op.value += event.data.data;
        }
        break;

      case 'runAsync': {
        const responseId = event.data.responseId;
        const promise = this.responseCBs.get(responseId);
        if (promise) {
          this.responseCBs.delete(responseId);
          promise.resolve(event.data.data);
        }
        break;
      }
      // guaranteed it will never reach here
      default:
        break;
    }
  }
}


export default WorkerAPI;
