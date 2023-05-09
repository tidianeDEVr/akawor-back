'use strict';
module.exports = (sequelize, DataTypes) => {
    const orderLine = sequelize.define('orderLine', {
        orderLineProductQty: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        orderLinePrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    },
    {
        paranoid: true
    });
    
    return orderLine; 
}