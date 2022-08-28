const categoryServices = require('../services/categoryServices');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await categoryServices.createCategory(name);
    if ('message' in result) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const result = await categoryServices.getAll();
    return res.status(result.code).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createCategory, getAll };