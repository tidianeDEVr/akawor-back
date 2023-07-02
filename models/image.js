'use strict';
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        imageTitle: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            //     notEmpty: true
            // }
        },
    });

    Image.associate = (models) => {
        Image.belongsTo(models.Product);
    }; 

    return Image; 
}