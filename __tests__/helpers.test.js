const { TestWatcher } = require('jest');

// test to make sure that format_date() takes Date() objects and returns dates in correct format
TestWatcher('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020');
});
