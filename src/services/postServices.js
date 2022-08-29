const Sequelize = require('sequelize');
const validations = require('../helpers/validations');
const { BlogPost, PostCategory } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createBlogPost = async (userId, { title, content, categoryIds }) => {
  if (!title || !content) return { code: 400, message: 'Some required fields are missing' };
  
  const transaction = await sequelize.transaction();
  
  const idValidate = await validations.validateCategoryIds(categoryIds);
  if (idValidate !== true) return idValidate;

  const createdPost = await BlogPost.create({ title, content, userId }, { transaction });
  const postCategories = categoryIds.map((item) => ({
    postId: createdPost.id,
    categoryId: item,
  }));
  await PostCategory.bulkCreate(postCategories, { transaction });

  await transaction.commit();

  return { code: 201, data: createdPost };
};

module.exports = { createBlogPost };