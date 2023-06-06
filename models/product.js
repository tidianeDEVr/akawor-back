'use strict';
module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('product', {
        productTitle: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        productMainImageId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        productSlug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productPrice: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true
            }
        },
        productDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        productState: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'PENDING',
        },
        productIsPublish: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
        productIsOutOfStock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: true
            }
        },
    }, 
    {
        paranoid: true
    });
    
    product.associate = (models) => {
        product.belongsTo(models.shop);
        product.belongsTo(models.category);
        product.hasMany(models.boost);
        product.hasMany(models.image)
    };

    return product; 
}