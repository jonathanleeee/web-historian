var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var worker = require('../workers/htmlfetcher');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(__dirname + '/../archives/sites.txt', function(error, data) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
};

exports.isUrlInList = function(url, callback) {

};

exports.addUrlToList = function(url, callback) {
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls, callback) {
  // var urls = [].slice.call(arguments);
  // urls = urls.slice(0, urls.length - 1);
  console.log(urls);
  console.log('This is the callback',callback);
  urls.forEach(function(url) {
    url = url.slice(0, url.length - 4);
    var file = fs.createWriteStream(__dirname + '/../archives/sites/' + url + '.html');
    var request = http.get('http://www.' + url + '.com/', function(response) {
      // console.log(response);
      response.pipe(file);
      callback(null, 'ok');
    });
  });
};

// var arr = ['google', 'amazon', 'ebay'];
// exports.downloadUrls(['google', 'amazon', 'ebay'], function(error, success) {
//   if (success) {
//     console.log('success!!!!');
//   }
// });

setInterval(worker.workerFunction, 1000);

















