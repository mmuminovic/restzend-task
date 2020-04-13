const validator = require("validator");

const Application = require("../models/applicationData");

module.exports = {
  createDoc: async ({ postInput }, req) => {
    const errors = [];
    if (
      validator.isEmpty(postInput.name) ||
      !validator.isLength(postInput.name, { min: 2 })
    ) {
      errors.push({ message: 'Name is invalid.' });
    }
    if (
      validator.isEmpty(postInput.address) ||
      !validator.isLength(postInput.address, { min: 2 })
    ) {
      errors.push({ message: 'Address is invalid.' });
    }
    if (
      validator.isEmpty(postInput.phoneNumber) ||
      !validator.isLength(postInput.phoneNumber, { min: 8 })
    ) {
      errors.push({ message: 'Phone number is invalid.' });
    }
    if (
      validator.isEmpty(postInput.zipCode) ||
      !validator.isLength(postInput.zipCode, { min: 5 })
    ) {
      errors.push({ message: 'Zip code is invalid.' });
    }
    if (
      validator.isEmpty(postInput.email) ||
      !validator.isEmail(postInput.email)
    ) {
      errors.push({ message: 'Email is invalid.' });
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const applicationDocument = await Application.create({
      name: postInput.name,
      email: postInput.email,
      address: postInput.address,
      phoneNumber: postInput.phoneNumber,
      zipCode: postInput.zipCode,
    });
    return applicationDocument.dataValues;
  },
  getDocs: async (req) => {
    const docs = await Application.findAll();
    const docsMapped = docs.map(doc => doc.dataValues);
    return docsMapped;
  },
};
