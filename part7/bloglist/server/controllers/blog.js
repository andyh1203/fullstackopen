const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: true, name: true, id: true,
  }).populate('comments', {
    content: true, id: true,
  });
  response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  const { body } = request;
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, savedBlog._id];
    await user.save();
    response.status(201).json(savedBlog);
  } else {
    return response.status(401).json({ error: 'token missing' });
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json(updatedBlog);
});

blogRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const blog = await Blog.findById(id);
    if (blog.user && (blog.user.toString() === decodedToken.id)) {
      blog.deleteOne();
      response.status(204).end();
    } else {
      return response.status(400).json({ error: 'not allowed to delete this blog' });
    }
  } else {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
});

module.exports = blogRouter;
