'use strict';
module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define('order', {
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    });
    
    return order; 
}