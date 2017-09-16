// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

// call the readlist of URL and turn the result into an array
  // loop through the array 
    // if any element in the array is Capitalized, 
      // we will call the download URL function on those element
        // and then we wil Lowercased them from sites.txt
            // **** REMEMBER TO CAPITALIZED THEM when first adding them to the sites.txt
archive.readListOfUrls(function(error, data) {
  if (error) {
    console.log('There was an error: ', error);
  } else {
    var storedUrls = data.toString().split('\n');
    var urlsToBeDownloaded = [];
    var urlsToBePlacedBack = [];
    storedUrls.forEach(function(url) {
      if ( url === url.toUpperCase()) {
        urlsToBeDownloaded.push(url);
        urlsToBePlacedBack.push(url.toLowerCase()); 
      }
    });
    archive.downloadUrls(urlsToBeDownloaded, function(error, success) {
      if (error) {
        console.log('There was an error');
      } else {
        //put the name of the urls back in site.txt lowercased
        fs.writeFile(__dirname + '/../archives/sites.txt', urlsToBePlacedBack.join('\n'), function(error) {
          if (error) {
            console.log('there was an error', error);
          } else {
            console.log('url added to sites.txt!');
          }
        });                
      }
    });
  }
}); 