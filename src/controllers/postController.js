const postServices = require('../services/postServices');

const createBlogPost = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await postServices.createBlogPost(id, req.body);
    if ('message' in result) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await postServices.getAll(id);
    return res.status(result.code).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await postServices.getOne(id);
    if ('message' in result) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: postId } = req.params;
    const { title, content } = req.body;
    const result = await postServices.updatePost(userId, postId, title, content);
    if ('message' in result) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createBlogPost, getAll, getOne, updatePost };