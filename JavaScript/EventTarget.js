class EventTarget {
  // Make a hashmap - the key will be the name of the event and the value will be an array of callbacks aka event listeners

  constructor() {
    this.hashmap = {};
  }

  addEventListener(name, callback) {
    // first parameter is the name of the event
    // second paramemter is the event listener
    // Adds event listener to this class
    if (this.hashmap.hasOwnProperty(name)) {
      this.hashmap[name].push(callback);
    } else {
      this.hashmap[name] = [callback];
    }
  }

  removeEventListener(name, callback) {
    // Remove the event listener associated with an event so the next time dispatchEvent is called we won't invoke that callback
    // Remove the event listener from this class
    if (this.hashmap.hasOwnProperty(name) && callback) {
      if (this.hashmap[name].length === 0) delete this.hashmap[name];

      this.hashmap[name] = this.hashmap[name].filter(
        (func) => func !== callback
      );
    }
  }

  dispatchEvent(name) {
    // The event name parameter should call its corresponding event listeners in the hashmap
    // If we pass in "click" here it would call any callback that was added to the click event
    if (this.hashmap.hasOwnProperty(name) && name) {
      const arr = this.hashmap[name];

      for (let i = 0; i < arr.length; i++) {
        const func = arr[i];
        func();
      }
    }
  }
}

const target = new EventTarget();

const callback1 = () => console.log("callback1");
const callback2 = () => console.log("callback2");

target.addEventListener("event", callback1);
target.addEventListener("event", callback2);

target.dispatchEvent("event");

target.removeEventListener("event", callback1);

target.dispatchEvent("event");
target.dispatchEvent("event");
target.dispatchEvent("event");
