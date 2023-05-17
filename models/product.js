'use strict';
module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('product', {
        productTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        productPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        productDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        productIsOutOfStock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    }, 
    {
        paranoid: true
    });
    
    product.associate = (models) => {
        product.belongsTo(models.shop, {
          foreignKey: {
            name: 'shopId',
            allowNull: false
          },
          as: 'products'
        });

        product.hasMany(models.boost, {
            foreignKey: {
              name: 'productId',
              allowNull: false
            },
            as: 'boosts'
        });

        product.belongsTo(models.category, {
            foreignKey: {
              name: 'shopId',
              allowNull: false
            },
            as: 'category'
        });
    };

    return product; 
}