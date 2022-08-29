module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
    { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER },
    { timestamps: false, tableName: 'PostCategories' },
    );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'categoryId',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
  };

  return PostCategory;
};