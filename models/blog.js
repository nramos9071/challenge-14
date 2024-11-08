const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}


Blog.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
        sequelize,
        timestamps: true, // Ensure timestamps are enabled
        createdAt: 'created_at', // Use custom column name for createdAt
        updatedAt: 'updated_at', // Use custom column name for updatedAt
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
  );

module.exports = Blog;