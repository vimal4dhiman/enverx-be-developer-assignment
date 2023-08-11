# Blog Application using NodeJS/ExpressJS and DynamoDB

This is a simple CRUD (Create, Read, Update, Delete) blog application built using Node.js, Express.js, and Amazon DynamoDB. It provides basic API endpoints to manage blog posts.

## Features

- Create new blog posts
- Retrieve all blog posts
- Retrieve a specific blog post by ID
- Update an existing blog post by ID
- Delete a blog post by ID

## Prerequisites

- Node.js (v14 or higher)
- Amazon DynamoDB credentials (Access Key ID, Secret Access Key) or suitable NoSQL database

## Setup

1. Clone this repository:

   ```sh
   git clone https://github.com/vimal4dhiman/enverx-be-developer-assignment.git
   cd enverx-be-developer-assignment
   ```

2. Install dependencies
   ```
    npm install
   ```
3. Configure your AWS DynamoDB credentials, if using DynamoDB or any other NoSQL database. Add all the necessary information in a new config.json file.
4. Run the application

   ```
   node index.js
   ```

5. Access the API. The API will be available at `http://localhost:3000`
6. Use Postman or similar tool to test the APIs in local environment.

### Sample JSON data

    {
        "id":"1",
        "createDate" :"Fri Aug 11 2023 14:42:22 GMT+0530 (India Standard Time)",
        "blogTitle": "Test Blog",
        "blog": "This is a test blog",
        "author": "ABC XYZ"
    }

### API Endpoints

- GET /posts: Retrieve all blog posts, sorted by date and title.
- GET /posts/:id: Retrieve a specific blog post by ID.
- POST /posts: Create a new blog post.
- PUT /posts/:id: Update an existing blog post by ID.
- DELETE /posts/:id: Delete a blog post by ID.

### Error Handling

If there are errors during API requests, error responses will be returned, including status codes and corresponding error messages
