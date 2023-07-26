'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderReference: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: `COMMAND-${new Date().getTime()}`
        },
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "AWAITING"
        },
        orderIsPayed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        orderDescription: {
            type: DataTypes.STRING
        },
        orderClientPhoneNumber: {
            type: DataTypes.STRING
        },
        orderClientEmail: {
            type: DataTypes.STRING
        },
        orderClientFirstName: {
            type: DataTypes.STRING
        },
        orderClientLastName: {
            type: DataTypes.STRING
        },
        orderClientCity: {
            type: DataTypes.STRING
        },
        orderClientCountry: {
            type: DataTypes.STRING
        },
        orderClientAddress: {
            type: DataTypes.STRING
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