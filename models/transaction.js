'use strict';
module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define('transaction', {
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

    return transaction; 
}