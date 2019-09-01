export default {
  list: new Map(),
  /**
   *
   * @param {string} event
   * @param {function} callback Function to be called when the event is emitted.
   */
  subscribe(event, callback) {
    if (!this.list.has(event)) {
      this.list.set(event, []);
    }
    this.list.get(event).push(callback);
  },

  /**
   *
   * @param {string} event
   * @param {function} [callback] If omitted, all subscribers to this event will be unsubscribed.
   * If included, must be the same reference to a callback passed with `subscribe(event, callback)`.
   */
  unsubscribe(event, callback) {
    if (callback && this.list.has(event)) {
      this.list.set(event, this.list.get(event).filter(cb => cb !== callback));
    } else {
      this.list.delete(event);
    }
  },

  /**
   *
   * @param {string} event
   * @param  {...any} args These args will be passed to subscribed callbacks.
   */
  emit(event, ...args) {
    if (this.list.has(event) && this.list.get(event).length) {
      this.list.get(event).forEach(callback => {
        callback(...args);
      });
    } else {
      console.log(`Event ${event} emitted without listeners.`);
    }
  },
};
