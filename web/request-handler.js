var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  console.log('METHOD', req.method, req.url);
  if ( req.method === 'GET' && req.url === '/') {
    console.log('first request');
    fs.readFile(__dirname + '/public/index.html', function(error, data) {
      if (error) {
        console.log('There was an error:', error);
        res.end(404);
      } else {
        console.log('sent');
        res.writeHead(200, {'Content-Type': 'text'});
        res.end(data);
      }
    });
  } else if (req.method === 'GET' && req.url === '/styles.css') {
    fs.readFile(__dirname + '/public/styles.css', function(error, data) {
      if (error) {
        console.log('There was an error:', error);
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      }
    });

  } else if (req.method === 'POST' && req.url === '/') {
    var body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      // console.log('BODY',typeof body);
      archive.readListOfUrls(function(error, data) {
        if (error) {
          console.log('There was an error:', error);
        } else {



          var storedUrls = data.toString().split('\n');
          // console.log('yup',storedUrls);
          var urlIsSaved = false;
          storedUrls.forEach(function(url) {
            if (url === body) {
              urlIsSaved = true;
            } 
          });
          if (!urlIsSaved) {
            console.log('is not saved');
            fs.readFile(__dirname + '/public/loading.html', function(error, data) {
              if (error) {
                console.log('There was an error:', error);
              } else {
                console.log('heyheyhey');
                res.writeHead(200, {'Content-Type': 'text'});
                res.end(data);
              }    
            }); 
            // console.log('data!!!!', Array.isArray(storedUrls), typeof body);
            // console.log(body)
            body = body.slice(4);
            storedUrls.push(body);
            // console.log(storedUrls.join('\n'));
            fs.writeFile(__dirname + '/../archives/sites.txt', storedUrls.join('\n'), function(error) {
              if (error) {
                console.log('there was an error', error);
              } else {
                console.log('url added!');
              }
            });       
          } else {
            body = body.slice(4);
            urlFileName = body.slice(0, body.length - 4);
            fs.readFile(__dirname + '/../archives/' + urlFileName, function(error, data) {
              if (error) {
                console.log('There was an error:', error);
              } else {
                res.writeHead(200, {'Content-Type': 'text'});
                res.end(data);
              }    
            });
            //get the saved file from the sites directory and send it to the client
          }
          //check if urlIsSaved is true
              //if it is, find the html file in archive and send it to the client
          //else, tell the client we don't have it yet and store the url in sites.txt
          // res.writeHead(200, {'Content-Type': ''});
          // res.end();
        }
      });
      
    


    });
  }
};
