const validator = require("validator");

const Application = require("../models/applicationModel");

module.exports = {
  createDoc: async ({ docInput }, req) => {
    const errors = [];
    if (
      validator.isEmpty(docInput.name) ||
      !validator.isLength(docInput.name, { min: 2 })
    ) {
      errors.push({ message: 'Name is invalid.' });
    }
    if (
      validator.isEmpty(docInput.address) ||
      !validator.isLength(docInput.address, { min: 2 })
    ) {
      errors.push({ message: 'Address is invalid.' });
    }
    if (
      validator.isEmpty(docInput.phoneNumber) ||
      !validator.isLength(docInput.phoneNumber, { min: 8 })
    ) {
      errors.push({ message: 'Phone number is invalid.' });
    }
    if (
      validator.isEmpty(docInput.zipCode) ||
      !validator.isLength(docInput.zipCode, { min: 5 })
    ) {
      errors.push({ message: 'Zip code is invalid.' });
    }
    if (
      validator.isEmpty(docInput.email) ||
      !validator.isEmail(docInput.email)
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
      name: docInput.name,
      email: docInput.email,
      address: docInput.address,
      phoneNumber: docInput.phoneNumber,
      zipCode: docInput.zipCode,
      files: docInput.file
    });
    return applicationDocument.dataValues;
  },
  getDocs: async (req) => {
    const docs = await Application.findAll();
    const docsMapped = docs.map(doc => doc.dataValues);
    return docsMapped;
  },
};
