'use strict';
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        imageTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });
    return Image; 
}