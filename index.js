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

// Create a new blog post
app.post("/posts", (req, res) => {
  const newPost = req.body;

  const params = {
    TableName: config.database.TableName,
    Item: newPost,
  };

  dynamodb.put(params, (err) => {
    if (err) {
      res
        .status(500)
        .json({ message: "An error occured while creating a post" });
    } else {
      res.status(201).json(newPost);
    }
  });
});

// Update a blog post by ID
app.put("/posts/:id", (req, res) => {
  const params = {
    TableName: config.database.TableName,
    Key: { id: req.params.id },
    UpdateExpression:
      "SET createDate = :createDate, blogTitle = :blogTitle, blog = :blog, author = :author",
    ExpressionAttributeValues: {
      ":createDate": req.body.createDate,
      ":blogTitle": req.body.blogTitle,
      ":blog": req.body.blog,
      ":author": req.body.author,
    },
    ReturnValues: "ALL_NEW",
  };

  dynamodb.update(params, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Error occured while updating post with id: " + params.Key.id,
      });
    } else if (!data.Attributes) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json(data.Attributes);
    }
  });
});

// Delete a blog post by ID
app.delete("/posts/:id", (req, res) => {
  const params = {
    TableName: config.database.TableName,
    Key: { id: req.params.id },
  };

  dynamodb.delete(params, (err) => {
    if (err) {
      res.status(500).json({
        message: "Error occured while deleting post with id: " + params.Key.id,
      });
    } else {
      res.json({ message: "Post deleted successfully" });
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
