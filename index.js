const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

const config = JSON.parse(fs.readFileSync("config.json"));

// Configuring AWS SDK with credentials
AWS.config.update({
  region: config.database.region,
  accessKeyId: config.database.accessKeyId,
  secretAccessKey: config.database.secretAccessKey,
});

// Setting up dyamodb client
const dynamodb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json());

//Get all blog post using
app.get("/posts", (req, res) => {
  const params = {
    TableName: "backend_engg_test",
  };

  dynamodb.scan(params, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error fetching posts" });
    } else {
      res.json(result.Items);
    }
  });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is running on port: ", PORT);
  } else {
    console.log("Server not started, an error occured, ", error);
  }
});
