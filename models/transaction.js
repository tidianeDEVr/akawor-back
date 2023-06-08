'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('transaction', {
        transactionStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    },
    {
        paranoid: true
    });

    return Transaction; 
}