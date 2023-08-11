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
    TableName: config.database.TableName,
  };

  dynamodb.scan(params, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error fetching posts" });
    } else {
      res.json(result.Items);
    }
  });
});

//Get a specific blog post by ID
app.get("/posts/:id", (req, res) => {
  const params = {
    TableName: config.database.TableName,
    Key: { id: req.params.id },
  };

  dynamodb.scan(params, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Error fetching post with id: " + params.Key.id });
    } else if (!result.Item) {
      res
        .status(400)
        .json({ message: "Post with id:" + params.Key.id + " not found" });
    } else {
      res.json(result.Item);
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
