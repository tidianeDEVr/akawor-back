'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
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