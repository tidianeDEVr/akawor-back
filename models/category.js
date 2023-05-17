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
        categoryParent: {
            type: DataTypes.STRING,
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
    },
    {
        paranoid: true
    });

    category.associate = (models) => {
        category.hasMany(models.shop, {
          foreignKey: {
            name: 'categoryId',
            allowNull: true
          },
          as: 'shops'
        });
        category.hasMany(models.product, {
          foreignKey: {
            name: 'productId',
            allowNull: true
          },
          as: 'products'
        });
    };
    
    return category; 
}