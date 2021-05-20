const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const blogs = require('../models/blogs');

const blogRouter = express.Router();

blogRouter.use(bodyParser.json());

blogRouter.route('/')
.get((req,res,next) => {
    blogs.find({})
    .then((blogs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blogs);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    blogs.create(req.body)
    .then((blog) => {
        console.log('Blog Created ', blog);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blog);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported here');
})
.delete((req, res, next) => {
    blogs.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

blogRouter.route('/:blogId')
.get((req,res,next) => {
    blogs.findById(req.params.blogId)
    .then((blog) => {
        if (blog != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(blog);
        }
        else {
            err = new Error('Blog ' + req.params.blogId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on here');
})
.put((req, res, next) => {
    blogs.findByIdAndUpdate(req.params.blogId, {
        $set: req.body
    }, { new: true })
    .then((blog) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(blog);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    blogs.findByIdAndRemove(req.params.blogId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end("Deleted successfully");
    }, (err) => next(err))
    .catch((err) => next(err));
});


blogRouter.route('/:blogId/comments')
.get((req,res,next) => {
    blogs.findById(req.params.blogId)
    .then((blog) => {
        if (blog != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(blog.comments);
        }
        else {
            err = new Error('Blog ' + req.params.blogId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    blogs.findById(req.params.blogId)
    .then((blog) => {
        if (blog != null) {
            blog.comments.push(req.body);
            blog.save()
            .then((blog) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(blog.comments);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Blog ' + req.params.blogId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported here');
})
.delete((req, res, next) => {
    blogs.findById(req.params.blogId)
    .then((blog) => {
        if (blog != null) {
            for (var i = (blog.comments.length -1); i >= 0; i--) {
                blog.comments.id(blog.comments[i]._id).remove();
            }
            blog.save()
            .then((blog) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(blog.comments);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Blog ' + req.params.blogId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
});

blogRouter.route('/:blogId/comments/:commentId')
.get((req,res,next) => {
    blogs.findById(req.params.blogId)
    .then((blog) => {
        if (blog != null && blog.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(blog.comments.id(req.params.commentId));
        }
        else if (blog == null) {
            err = new Error('Blog ' + req.params.blogId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported here');
})
.put((req, res, next) => {
    blogs.findById(req.params.blogId)
    .then((blog) => {
        if (blog != null && blog.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                blog.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                blog.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            blog.save()
            .then((blog) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(blog);                
            }, (err) => next(err));
        }
        else if (blog == null) {
            err = new Error('Blog ' + req.params.blogId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    blogs.findById(req.params.blogId)
    .then((blog) => {
        if (blog != null && blog.comments.id(req.params.commentId) != null) {
            blog.comments.id(req.params.commentId).remove();
            blog.save()
            .then((blog) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end('Deleted Successfully');                
            }, (err) => next(err));
        }
        else if (blog == null) {
            err = new Error('Blog ' + req.params.blogId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = blogRouter;