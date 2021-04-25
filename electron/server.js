const mime = require("mime");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const initialiseServer = function () {
  var server = express();

  // Parse Body
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  const allowedOrigins = ["http://localhost:3000"];
  server.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) === -1) {
          const msg =
            "The CORS policy for this site does not allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );

  server.post("/api/pay", (req, res) => {
    const value = req.body;

    const successObject = {
      success: true,
      message: "Successfully Paid!",
    };

    // Return successful response
    res.json(successObject);

    // Save to a file locally
    var filePath = __dirname + "/data.txt";
    fs.writeFile(filePath, JSON.stringify(value), (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("File saved");
    });
  });

  server.listen(8888, function () {
    console.log("server started at http://localhost:8888");
  });
};

module.exports = {
  initialiseServer,
};
