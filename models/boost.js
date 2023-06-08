'use strict';
module.exports = (sequelize, DataTypes) => {
    const Boost = sequelize.define('Boost', {
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

    Boost.associate = (models) => {
        Boost.belongsTo(models.Product);
    };
    
    
    return Boost; 
}