'use strict';
module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define('Banner', {
        bannerType: {
            type: DataTypes.STRING,
        },
        bannerStatut: {
            type: DataTypes.STRING,
            defaultValue: 'ONLINE',
        },
        bannerFilename: {
            type: DataTypes.STRING,
        },
        bannerTitle: {
            type: DataTypes.STRING,
        },
        bannerSubTitle: {
            type: DataTypes.STRING,
        },
        bannerStartAt: {
            type: DataTypes.STRING,
        },
        bannerFinishAt: {
            type: DataTypes.STRING,
        },
        bannerRedirectTo: {
            type: DataTypes.STRING,
        }
    },
    {
        paranoid: true
    });

    Banner.associate = (models) => {
        Banner.hasOne(models.Image);
    };
    return Banner; 
}