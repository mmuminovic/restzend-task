const express = require("express");
const app = express();
const sequelize = require("./database");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
// const multer = require("multer");

// const graphHttp = require("express-graphql");
// const graphqlSchema = require("./graphql/types/schema");
// const graphqlResolvers = require("./graphql/Mutation/resolvers");

const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/types/defs");
const { resolvers } = require("./graphql");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: true,
});

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '/images/'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
// );

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// app.put("/post-image", (req, res, next) => {
//   if (!req.file) {
//     return res.status(200).json({ message: "No file provided." });
//   }
//   return res.json({ message: "File stored", filePath: req.file.path });
// });

// app.use(
//   "/graphql",
//   graphHttp({
//     schema: graphqlSchema,
//     rootValue: graphqlResolvers,
//     graphiql: true,
//     customFormatErrorFn(err) {
//       if (!err.originalError) {
//         return err;
//       }
//       const data = err.originalError.data;
//       const message = err.message || "An error occured!";
//       const code = err.originalError.code || 500;
//       return { data: data, message: message, status: code };
//     },
//   })
// );

app.use("/public", express.static(path.join(__dirname, "/storage")));
server.applyMiddleware({ app });

sequelize.sync().then((result) => {
  app.listen(8000);
});
