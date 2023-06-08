'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });
    
    return Order; 
}