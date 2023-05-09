'use strict';
module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
        roleLibelle: {
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
    
    role.associate = (models) => {
        role.hasMany(models.user, {
          foreignKey: {
            name: 'roleId',
            allowNull: true
          },
          as: 'users'
        });
    };

    return role; 
}