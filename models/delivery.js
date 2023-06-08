'use strict';
module.exports = (sequelize, DataTypes) => {
    const Delivery = sequelize.define('delivery', {
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
    
    return Delivery;
}