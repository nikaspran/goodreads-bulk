'use strict';

var request = require('request');
var config = require('./config.json');
var isbnToName = config.namesByIsbn13;

request({
  url: 'https://www.goodreads.com/book/review_counts.json',
  qs: {
    key: config.goodreads.key,
    isbns: Object.keys(isbnToName).join(',')
  }
}, function (error, response, body) {
  if (error) {
    console.error(error);
    return;
  }

  var bookRatings = JSON.parse(body).books.map(function (book) {
    return {rating: book['average_rating'], name: isbnToName[book.isbn13], ratingCount: book['ratings_count']};
  }).filter(function (book) {
    return book.rating > 3.99 && book.ratingCount > 200;
  }).sort(function descending(a, b) {
    return b.rating - a.rating;
  });

  bookRatings.forEach(function (book) {
    console.log(book.rating + ' ' + book.name + ' (' + book.ratingCount + ' ratings)');
  });
});