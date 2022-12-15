const fs = require('fs');

class File {
    static readFile (filepath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = File;
