const {getFileLink} = require('../../helpers/storage');

module.exports = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    email: ({ email }) => email,
    phoneNumber: ({ phoneNumber }) => phoneNumber,
    address: ({ address }) => address,
    zipCode: ({ zipCode }) => zipCode,
    files: ({ files }) => getFileLink(files),
}
