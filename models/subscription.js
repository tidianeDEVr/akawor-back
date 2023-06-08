'use strict';
module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('Subscription', {
        subscriptionFinishAt: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    },
    {
        paranoid: true
    });

    // Subscription.associate = (models) => {
    //     Subscription.belongsTo(models.Subscription);
    // };

    return Subscription; 
}