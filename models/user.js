const { Model, DataTypes } = require('sequelize');  
const bcrypt = require('bcrypt');   
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init({
    
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
    },
    bio: { // Add the bio field
        type: DataTypes.TEXT,
        allowNull: true, // Allow null if bio is optional
      },
},
{
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        },
    },
    sequelize,
    timestamps: true, // Ensure timestamps are enabled
    createdAt: 'created_at', // Use custom column name for createdAt
    updatedAt: 'updated_at', // Use custom column name for updatedAt
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
}
);

module.exports = User;