var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  console.log('METHOD',req.method);
  if ( req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/public/index.html', function(error, data) {
      if (error) {
        console.log('There was an error:', error);
      } else {
        res.writeHead(200, {'Content-Type': 'text'});
        res.end(data);
      }
    });
  } else if (req.method === 'GET' && req.url === '/styles.css') {
    fs.readFile(__dirname + '/public/index.html', function(error, data) {
      if (error) {
        console.log('There was an error:', error);
      } else {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      }
    });

  } else if (req.method === 'POST' && req.url === '/getWebsite') {
    var body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('BODY',typeof body);
      archive.readListOfUrls(function(error, data) {
        if (error) {
          console.log('There was an error:', error);
        } else {
          var storedUrls = data.toString().split('\n');
          var urlIsSaved = false;
          storedUrls.forEach(function(url) {
            if (url === body) {
              urlIsSaved = true;
            } 
          });
          if (!urlIsSaved) {
            fs.readFile(__dirname + '/public/loading.html', function(error, data) {
              if (error) {
                console.log('There was an error:', error);
              } else {
                res.writeHead(200, {'Content-Type': 'text'});
                res.end(data);
              }    
            });        
          }
          //check if urlIsSaved is true
              //if it is, find the html file in archive and send it to the client
          //else, tell the client we don't have it yet and store the url in sites.txt
          res.writeHead(200, {'Content-Type': ''});
          res.end();
        }
      });
      
    


    });
  }
};
