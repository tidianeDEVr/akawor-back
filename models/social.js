'use strict';
module.exports = (sequelize, DataTypes) => {
    const Social = sequelize.define('Social', {
        facebookLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instagramLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tiktokLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        websiteLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shopPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shopEmailAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        paranoid: true
    });

    Social.associate = (models) => {
        Social.belongsTo(models.Shop)
    };

    return Social; 
}