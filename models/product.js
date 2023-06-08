'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productTitle: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        productMainImage: {
            type: DataTypes.STRING,
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
            defaultValue: 'DRAFT',
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
    
    Product.associate = (models) => {
        Product.belongsTo(models.Shop);
        Product.belongsTo(models.Category);
        Product.hasMany(models. Boost);
        Product.hasMany(models.Image)
    };

    return Product; 
}