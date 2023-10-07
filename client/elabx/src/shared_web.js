
import { Terminal } from 'xterm';

class WorkerAPI {
    constructor(expected) {
      this.nextResponseId = 0;
      this.responseCBs = new Map();
      this.worker = new Worker('/worker.js');
      const channel = new MessageChannel();
      this.port = channel.port1;
      this.port.onmessage = this.onmessage.bind(this);
  
      const remotePort = channel.port2;
      // pass the remortPort to the worker along with the object.
      this.worker.postMessage({id: 'constructor', data: remotePort},
                              [remotePort]);
      this.term = null;
      this.msg = ""
      this.testPassed = false;
      this.output = expected;
    }

    getTestPassStatus(){
      return this.testPassed;
    }

    initTerm(){
      var op = document.getElementById("output")
      if(op.hasChildNodes()){
        op.removeChild(output.children[0])
      }
      this.term = new Terminal();
      this.term.open(document.getElementById('output'))
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
  
    getOutput(){
      return this.output;
    }
  
    // this is called when an message is sent back from `remotePort`.
    async onmessage(event) {
      switch (event.data.id) {
        case 'write':
          console.log(event.data.data)
          this.msg += event.data.data
          

          if(this.term == null){
            this.initTerm();
          }
  
          if (this.term !== null){
            this.term.clear()
            this.term.writeln(this.msg)

            console.log(this.output)

            if(this.output === this.msg){
              event.data.data = "All Test Passed";
              this.testPassed = true;
            }

            console.log("Includes:", event.data.data.includes("All Test Passed"))
            if(event.data.data.includes("All Test Passed")){
              this.testPassed = true;
            } else{
              this.testPassed = false;
              this.term.writeln("Test Failed")
            }
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