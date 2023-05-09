'use strict';
module.exports = (sequelize, DataTypes) => {
    const image = sequelize.define('image', {
        imageTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        imagePath: {
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
    
    return image; 
}