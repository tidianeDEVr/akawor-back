'use strict';
module.exports = (sequelize, DataTypes) => {
    const OrderLine = sequelize.define('OrderLine', {
        orderLineJsonCart: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        orderLineTotalPrice: {
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
    
    return OrderLine; 
}