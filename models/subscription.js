'use strict';
module.exports = (sequelize, DataTypes) => {
    const subscription = sequelize.define('subscription', {
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

    subscription.associate = (models) => {
        subscription.belongsTo(models.subscription, {
          foreignKey: {
            name: 'subscriptionId',
            allowNull: true
          },
          as: 'subscriptions'
        });
    };

    return subscription; 
}