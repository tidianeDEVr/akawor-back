'use strict';
module.exports = (sequelize, DataTypes) => {
    const shop = sequelize.define('shop', {
        shopLibelle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        shopAddress: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            },
        },
        shopGoogleMapsUrl: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            },
        },
        shopProfileImagePath: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        shopCoverImagePath: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },  
    },
    {
        paranoid: true
    });

    shop.associate = (models) => {
        shop.belongsTo(models.user, {
          foreignKey: {
            name: 'ownerId',
            allowNull: true
          },
          as: 'shops'
        });
    };

    return shop; 
}