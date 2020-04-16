const Application = require("../../models/applicationModel");

module.exports = {
  getDocs: async (req) => {
    const docs = await Application.findAll({
      order: [
        ["createdAt", "DESC"],
      ],
    });
    const docsMapped = docs.map((doc) => doc.dataValues);
    return docsMapped;
  },
};
