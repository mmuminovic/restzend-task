const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const validator = require("validator");

const Application = require("../../models/applicationModel");

const uploadFile = async (file) => {
  const ext = file.filename.substr(file.filename.lastIndexOf(".") + 1);
  const newFileName = new Date().toISOString().replace(/:/g, "-") + `.${ext}`;
  const filePath = path.join(__dirname, "../storage/", newFileName);
  const stream = file.createReadStream();
  await new Promise((res) =>
    stream.pipe(fs.createWriteStream(filePath)).on("close", res)
  );
  return newFileName;
};

module.exports = {
  createDoc: async (_, docInput) => {
    if (docInput.files) {
      const file = await docInput.files;
      const fileName = await uploadFile(file);
      docInput.files = fileName;
    }

    const user = { ...docInput };

    const errors = [];
    if (
      validator.isEmpty(docInput.name) ||
      !validator.isLength(docInput.name, { min: 2 })
    ) {
      errors.push({ message: "Name is invalid." });
    }
    if (
      validator.isEmpty(docInput.address) ||
      !validator.isLength(docInput.address, { min: 2 })
    ) {
      errors.push({ message: "Address is invalid." });
    }
    if (
      validator.isEmpty(docInput.phoneNumber) ||
      !validator.isLength(docInput.phoneNumber, { min: 12 })
    ) {
      errors.push({ message: "Phone number is invalid." });
    }
    if (
      validator.isEmpty(docInput.zipCode) ||
      !validator.isLength(docInput.zipCode, { min: 5 })
    ) {
      errors.push({ message: "Zip code is invalid." });
    }
    if (
      validator.isEmpty(docInput.email) ||
      !validator.isEmail(docInput.email)
    ) {
      errors.push({ message: "Email is invalid." });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const applicationDocument = await Application.create(user);
    return applicationDocument.dataValues;
  },
};
