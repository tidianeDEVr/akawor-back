'use strict';
module.exports = (sequelize, DataTypes) => {
    const Social = sequelize.define('social', {
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

    Social.associate = (models) => {
        Social.belongsTo(models.Shop);
    };

    return Social; 
}