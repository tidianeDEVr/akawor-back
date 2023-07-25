'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "AWAITING"
        },
        orderIsPayed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    },
    {
        paranoid: true
    });
    
    Order.associate = (models) => {
        Order.belongsTo(models.User),
        Order.hasOne(models.OrderLine)
    }

    return Order; 
}