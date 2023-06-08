'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        categoryLibelle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        categoryType: {
            type: DataTypes.STRING,
            defaultValue: "product",
            validate: {
                notEmpty: true
            }
        },
        categorySlug: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        categoryIconClass: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
    },
    {
        paranoid: true
    });

    Category.associate = (models) => {
      Category.hasMany(models.Shop);
      Category.hasMany(models.Product);
      Category.hasOne(models.Category, {
        foreignKey: 'categoryParentId'
      });
    };
    
    return Category; 
}