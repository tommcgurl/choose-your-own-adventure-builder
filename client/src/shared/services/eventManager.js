const eventManager = {
  list: new Map(),

  on(event, callback) {
    if (!this.list.has(event)) {
      this.list.set(event, []);
    }
    this.list.get(event).push(callback);
    return this;
  },

  off(event) {
    this.list.delete(event);
    return this;
  },

  emit(event, ...args) {
    if (this.list.has(event) && this.list.get(event).length) {
      this.list.get(event).forEach(callback => {
        // Pushes to the bottom of the stack
        setTimeout(() => {
          callback(...args);
        }, 0);
      });
    } else {
      console.log(`Event ${event} emitted without listeners.`);
    }
  },
};

export default eventManager;
