// helper method for writing to file

const fs = require('fs');

/**
 *  Function to write data to the JSON file given a destination and some content
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


module.exports = { writeToFile };
