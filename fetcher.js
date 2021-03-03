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

const request = require('request');
// const fs = require('fs');
// const readline = require('readline');


// const write = function(localPath, body) {
//   fs.writeFile(localPath, body, err => {
//     if (err) {
//       // localPath is invalid
//       console.log(`Path ${localPath} doesn't exist.`);
//       return;
//     }
//     console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`)
//   });
// }


// const fetcheAndSave = function(url, localPath) {

//   request(url, (err, res, body) => {
//     if (err) {
//       console.log('Error', err);
//       return;
//     }
//     if (res.statusCode !== 200) {
//       console.log(`Status Code: ${res.statusCode}`);
//       return;
//     }
//     // no Error and res.statusCode is 200
    
//     fs.access(localPath, err => {
//       if (err) {
//         //localPath doesn't exist
//         write(localPath, body);

//       } else {
//         // localPath exists, Ask the user if they want to replace the file
//         const rl = readline.createInterface({
//           input: process.stdin,
//           output: process.stdout
//         });
//         rl.question('The file exists, do you want to replace it? (y/n) ', ans => {
//           if (ans === 'y') {
//             write(localPath, body);
//           }
//           rl.close();
//         });
//       }
//     });
//   });
// };


// const url = process.argv[2];
// const localPath = process.argv[3];
// if (url && localPath) {
//   fetcheAndSave(url, localPath);
// } else {
//   console.log('You must provide both a url and localpath');
// }
