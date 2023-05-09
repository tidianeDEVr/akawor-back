'use strict';
module.exports = (sequelize, DataTypes) => {
    const pack = sequelize.define('pack', {
        packLibelle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        packPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        packDescription: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        packIsAvailable: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
    }, 
    {
        paranoid: true
    });
    
    pack.associate = (models) => {
        pack.hasMany(models.subscription, {
          foreignKey: {
            name: 'packId',
            allowNull: true
          },
          as: 'subscriptions'
        });
    };

    return pack; 
}