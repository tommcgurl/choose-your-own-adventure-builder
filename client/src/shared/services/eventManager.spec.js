import eventManager from './eventManager';

describe('eventManager', () => {
  beforeEach(() => {
    eventManager.list.clear();
  });

  describe('on', () => {
    it('adds listener for event when there are no listeners', () => {
      // Arrange
      function testFunction() {}

      // Assume
      expect(eventManager.list.has('test')).toBe(false);

      // Act
      eventManager.on('test', testFunction);

      // Assume
      expect(eventManager.list.has('test')).toBe(true);
      expect(eventManager.list.get('test')[0]).toBe(testFunction);
    });

    it('adds listener for event when there is already a listener', () => {
      // Arrange
      function testFunction1() {}
      function testFunction2() {}
      eventManager.on('test', testFunction1);

      // Assume
      expect(eventManager.list.has('test')).toBe(true);
      expect(eventManager.list.get('test').length).toBe(1);

      // Act
      eventManager.on('test', testFunction2);

      // Assume
      expect(eventManager.list.get('test').length).toBe(2);
    });
  });

  describe('off', () => {
    it('removes specific listener for event when called with callback', () => {
      // Arrange
      function testFunction1() {}
      function testFunction2() {}
      eventManager.on('test', testFunction1);
      eventManager.on('test', testFunction2);

      // Assume
      expect(eventManager.list.get('test').length).toBe(2);

      // Act
      eventManager.off('test', testFunction1);

      // Assert
      expect(eventManager.list.get('test').length).toBe(1);
    });

    it('removes all listeners for event when called without callback', () => {
      // Arrange
      function testFunction1() {}
      function testFunction2() {}
      eventManager.on('test', testFunction1);
      eventManager.on('test', testFunction2);

      // Assume
      expect(eventManager.list.get('test').length).toBe(2);

      // Act
      eventManager.off('test');

      // Assert
      expect(eventManager.list.has('test')).toBe(false);
    });
  });

  describe('emit', () => {
    it('works', () => {
      // Arrange
      const mockFn = jest.fn();
      eventManager.on('test', mockFn);

      // Assume
      expect(eventManager.list.has('test')).toBe(true);
      expect(mockFn).not.toHaveBeenCalled();

      // Act
      eventManager.emit('test');

      // Assert
      expect(mockFn).toHaveBeenCalled();
    });

    it('passes args to callback', () => {
      // Arrange
      const mockFn = jest.fn();
      eventManager.on('test', mockFn);
      const arg1 = 1;
      const arg2 = 2;

      // Act
      eventManager.emit('test', arg1, arg2);

      // Assert
      expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
    });
  });
});
