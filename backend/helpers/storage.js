const path = require('path');
const appUrl = path.join(__dirname, "../graphql/storage/");

module.exports = {
    getFileLink: fileName => {
        if (!fileName) {
            return ""
        }
        return appUrl + fileName
    },
}
