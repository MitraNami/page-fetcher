const request = require('request');
const fs = require('fs');

const pageDownloader = function(url, filePath) {
  request(url, (error, response, body) => {
    if (error) {
      console.log('Error:', error);
      return;
    }
    if (response.statusCode !== 200) {
      console.log('Bad request: ', response.statusCode);
      return;
    }
    fs.stat(filePath, (error, stat) => {
      if (error === null) {
        //file exists
        console.log('File already exists.');
        return;
      }
      if (error.code === 'ENOENT') {
        //file doesn't exist
        fs.writeFile(filePath, body, (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`Downloade and save ${body.length} bytes to ${filePath}`);
        });
      }
    });
  });
};


const [url, localPath] = process.argv.slice(2);
pageDownloader(url,localPath);