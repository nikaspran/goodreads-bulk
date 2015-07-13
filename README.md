# Goodreads Bulk

A quick and dirty Node app to bulk get Goodreads book ratings. Useful when exploring deals or large lists of books.

## Usage

* `npm install`
* Create a `config.json` file in the root of the app (see `config.example.json` for more info)
* `npm start`
* It will output the book names sorted by rating
* Feel free to fiddle around with the parameters in the `index.js` to suit your needs

## How to get ISBN to name mappings for config.json

### Book Depository

Run in dev console when in some category (will copy to clipboard on Chrome):

```js
var x = {};
$('#mainContent .module .semanticContent').each(function (idx, bookEl) {
  var isbn = $(bookEl).find('[itemprop="isbn"]').attr('content');
  x[isbn] = $(bookEl).find('[itemprop="name"]').attr('content');
});
copy(JSON.stringify(x, null, 2));
```

## TODO

* Chrome extension for Amazon, Book Depository etc.?