const { format } = require('express/lib/response');
const { pluralize } = require('sequelize/dist/lib/utils');
const { format_date } = require('../utils/helpers');

// test to make sure that format_date() takes Date() objects and returns dates in correct format
test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020');
});

// test to pluralize words
test('format_plural() returns a pluralizes words', () => {
  const word1 = format_plural('tiger', 1);
  const word2 = format_plural('lion', 2);

  expect(word1).toBe('tiger');
  expect(word2).toBe('lions');
});
