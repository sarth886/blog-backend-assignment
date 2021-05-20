# blog-backend-assignment
API to support CURD opeartions for blogs and comments to the blogs.

The Database I have used is mongodb which is a nosql database the benefits of it are:

1.Flexible data models
NoSQL databases typically have very flexible schemas. A flexible schema allows you to easily make changes to your database as requirements change. You can iterate quickly and continuously integrate new application features to provide value to your users faster.

2.Horizontal scaling
Most NoSQL databases allow you to scale-out horizontally, meaning you can add cheaper, commodity servers whenever you need to.

3.Fast queries
Data in NoSQL databases is typically stored in a way that is optimized for queries. The rule of thumb when you use MongoDB is Data is that is accessed together should be stored together. Queries typically do not require joins, so the queries are very fast.

4.Easy for developers.



(./routes/index.js)
localhost:3000/  Base Endpoint

(./routes/blog.js)
localhost:3000/blogs   
 1.GET - Returns all the blogs
 2.POST- Post a blog
 3.DELETE - Removes all the blogs.

localhost:3000/blogs/:blogId   
 1 GET - Returns the blog with the particular blogId
 2.PUT - Make changes to the particular blog.
 3.DELETE - Removes the particular blog .

localhost:3000/blogs/:blogId/comments  
 1 GET - Returns all the comments for the particular blog
 2.POST- Post a comment to the blog.
 3.DELETE - Removes all the comments for the particular blog.

localhost:3000/blogs/:blogId/comments/:commentId   
 1 GET - Returns the particular comment for the particular blog.
 2.PUT - Make changes to the particular comment of the particular blog
 3.DELETE - Removes the particular comment.

Some curl url to try for postman:
1.localhost:3000/blogs  .
2.localhost:3000/blogs/60a62b409efd825c1412d5b1.
3.localhost:3000/blogs/60a62b409efd825c1412d5b1/comments.
4.localhost:3000/blogs/60a62b409efd825c1412d5b1/comments/60a62c379efd825c1412d5b5.



After Clonning go the blog-backend-directory and type npm start if it shows "Connected correctly to server" means the mongo server is connected then you can carry on with the postman url calls.

Mongoose Schema: (You can find the models at ./models/blogs.js)
I have used a very simple schema for blog it has:
1.title
2.author
3.blog
4.comments
  The comment field is itself a schema which has :
  1.rating
  2.author
  3.comment

Each blog and comment on its creation is assigned a unique blogId and commentId by default which we can use to perform operations on that particular blog or comment.


