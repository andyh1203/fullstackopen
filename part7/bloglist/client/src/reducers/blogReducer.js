import blogService from '../services/blogs';
import commentService from '../services/comments';
import { setNotification } from './notificationReducer';

/* Update the component state here */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS': {
      state = action.blogs;
      return state;
    }
    case 'NEW_BLOG': {
      state = [...state, action.newBlog];
      return state;
    }
    case 'DELETE_BLOG': {
      return state.filter((blog) => blog.id !== action.id);
    }
    case 'LIKE': {
      return state.map((blog) => (blog.id !== action.data.id ? blog : action.data.returnedBlog));
    }
    case 'SET_VISIBLE': {
      return state.map((blog) => ((blog.id === action.id) ? { ...blog, visible: !blog.visible } : blog));
    }
    case 'ADD_COMMENT': {
      console.log(action.returnedComment);
      const blog = state.find((b) => b.id === action.returnedComment.blog);
      console.log(blog.comments);
      blog.comments = [...blog.comments, { content: action.returnedComment.content, id: action.returnedComment.id }];
      console.log(blog.comments);
      state = [...state];
      return state;
    }
    default: return state;
  }
};

/* Interface with backend here */
export const createBlog = (blog) => async (dispatch, getState) => {
  const { authenticatedUser } = getState();
  const newBlogData = await blogService.create(blog, authenticatedUser.token);
  const newBlog = { ...newBlogData, visible: false, user: { username: authenticatedUser.username } };
  dispatch({
    type: 'NEW_BLOG',
    newBlog,
  });
  dispatch(setNotification({
    message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
    className: 'success',
  }));
};

export const initializeBlogs = () => async (dispatch) => {
  const blogsData = await blogService.getAll();
  const blogs = blogsData.map((blog) => ({ ...blog, visible: false }));
  dispatch({
    type: 'INITIALIZE_BLOGS',
    blogs,
  });
};

export const likeBlog = (id, updatedBlog) => async (dispatch) => {
  const { user } = updatedBlog;
  const returnedBlogData = await blogService.update(id, { ...updatedBlog, user: user.id });
  const returnedBlog = { ...returnedBlogData, user };
  dispatch({
    type: 'LIKE',
    data: {
      id, returnedBlog,
    },
  });
};

export const deleteBlog = (blog) => async (dispatch, getState) => {
  const { authenticatedUser } = getState();
  window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
  const { id } = blog;
  await blogService.del(id, authenticatedUser.token);
  dispatch({
    type: 'DELETE_BLOG',
    id,
  });
};

export const addComment = (blog, comment) => async (dispatch) => {
  const returnedComment = await commentService.create({ content: comment, blog_id: blog.id });
  dispatch({
    type: 'ADD_COMMENT',
    returnedComment,
  });
};

export default blogReducer;
