'use strict';
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        reviewStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ONLINE',
        },
        reviewAmount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        reviewDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
    },
    {
        paranoid: true
    });

    Review.associate = (models) => {
        Review.belongsTo(models.Product);
        Review.belongsTo(models.User);
    };
    
    return Review; 
}