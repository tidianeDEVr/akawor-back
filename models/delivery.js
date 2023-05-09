'use strict';
module.exports = (sequelize, DataTypes) => {
    const delivery = sequelize.define('delivery', {
        deliveryStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, 
    {
        paranoid: true
    });
    
    return delivery; 
}