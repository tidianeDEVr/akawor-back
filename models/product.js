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
        productPricePromo: {
            type: DataTypes.INTEGER,
        },
        productStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        productWeight: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        productDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        productState: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'DRAFT',
        },
        productFeatures: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productIsOnline: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, 
    {
        paranoid: true
    });
    
    Product.associate = (models) => {
        Product.belongsTo(models.Shop);
        Product.belongsTo(models.Category);
        Product.belongsTo(models.Wishlist)
        Product.hasMany(models. Boost);
        Product.hasMany(models.Image);
    };

    return Product; 
}