const { Category } = require('../database/models');

const createCategory = async (categoryName) => {
  if (!categoryName) return { code: 400, message: '"name" is required' };
  const { id } = await Category.create(categoryName);
  return { code: 201, data: { id, name: categoryName } };
};

const getAll = async () => {
  const result = await Category.findAll();
  return { code: 200, data: result };
};

module.exports = { createCategory, getAll };