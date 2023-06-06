'use strict';
module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define('category', {
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

    category.associate = (models) => {
      category.hasMany(models.shop);
      category.hasMany(models.product);
      category.hasOne(models.category, {
        foreignKey: 'categoryParentId'
      });
    };
    
    return category; 
}