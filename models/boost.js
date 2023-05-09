'use strict';
module.exports = (sequelize, DataTypes) => {
    const boost = sequelize.define('boost', {
        boostStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        boostFinishAt: {
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

    boost.associate = (models) => {
        boost.belongsTo(models.product, {
          foreignKey: {
            name: 'productId',
            allowNull: false
          },
          as: 'boosts'
        });
    };
    
    
    return boost; 
}