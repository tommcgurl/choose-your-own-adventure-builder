import eventService from './eventService';

describe('eventService', () => {
  beforeEach(() => {
    eventService.list.clear();
  });

  describe('subscribe', () => {
    it('adds listener for event when there are no listeners', () => {
      // Arrange
      function testFunction() {}

      // Assume
      expect(eventService.list.has('test')).toBe(false);

      // Act
      eventService.subscribe('test', testFunction);

      // Assume
      expect(eventService.list.has('test')).toBe(true);
      expect(eventService.list.get('test')[0]).toBe(testFunction);
    });

    it('adds listener for event when there is already a listener', () => {
      // Arrange
      function testFunction1() {}
      function testFunction2() {}
      eventService.subscribe('test', testFunction1);

      // Assume
      expect(eventService.list.has('test')).toBe(true);
      expect(eventService.list.get('test').length).toBe(1);

      // Act
      eventService.subscribe('test', testFunction2);

      // Assume
      expect(eventService.list.get('test').length).toBe(2);
    });
  });

  describe('unsubscribe', () => {
    it('removes specific listener for event when called with callback', () => {
      // Arrange
      function testFunction1() {}
      function testFunction2() {}
      eventService.subscribe('test', testFunction1);
      eventService.subscribe('test', testFunction2);

      // Assume
      expect(eventService.list.get('test').length).toBe(2);

      // Act
      eventService.unsubscribe('test', testFunction1);

      // Assert
      expect(eventService.list.get('test').length).toBe(1);
    });

    it('removes all listeners for event when called without callback', () => {
      // Arrange
      function testFunction1() {}
      function testFunction2() {}
      eventService.subscribe('test', testFunction1);
      eventService.subscribe('test', testFunction2);

      // Assume
      expect(eventService.list.get('test').length).toBe(2);

      // Act
      eventService.unsubscribe('test');

      // Assert
      expect(eventService.list.has('test')).toBe(false);
    });
  });

  describe('emit', () => {
    it('works', () => {
      // Arrange
      const mockFn = jest.fn();
      eventService.subscribe('test', mockFn);

      // Assume
      expect(eventService.list.has('test')).toBe(true);
      expect(mockFn).not.toHaveBeenCalled();

      // Act
      eventService.emit('test');

      // Assert
      expect(mockFn).toHaveBeenCalled();
    });

    it('passes args to callback', () => {
      // Arrange
      const mockFn = jest.fn();
      eventService.subscribe('test', mockFn);
      const arg1 = 1;
      const arg2 = 2;

      // Act
      eventService.emit('test', arg1, arg2);

      // Assert
      expect(mockFn).toHaveBeenCalledWith(arg1, arg2);
    });
  });
});
