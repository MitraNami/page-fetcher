const request = require('request');
const fs = require('fs');


const saveFile = function(url, localPath) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("URL Erro:", error);
      return
    } else if (response.statusCode !== 200) {
      console.log("Respond Error");
      return
    }
    fs.writeFile(localPath, body, 'utf8', (error) => {
      if (error) {
        console.log("The path doesn't exist.");
        return
      }
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
      
    });
  });
};

const [url, localPath] = process.argv.slice(2);
saveFile(url,localPath);