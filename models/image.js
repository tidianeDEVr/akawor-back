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
    });
    return image; 
}