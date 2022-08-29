const Sequelize = require('sequelize');
const validations = require('../helpers/validations');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
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

const getAll = async (userId) => {
  const result = await BlogPost.findAll({
    where: { userId },
    include: [{ model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  return { code: 200, data: result };
};

const getOne = async (postId) => {
  const result = await BlogPost.findByPk(postId, {
    include: [{ model: Category, as: 'categories', through: { attributes: [] } },
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });
  if (!result) return { code: 404, message: 'Post does not exist' };
  return { code: 200, data: result };
};

module.exports = { createBlogPost, getAll, getOne };