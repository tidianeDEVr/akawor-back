'use strict';
module.exports = (sequelize, DataTypes) => {
    const Pack = sequelize.define('Pack', {
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
    
    Pack.associate = (models) => {
        Pack.hasMany(models.Subscription);
    };

    return Pack; 
}