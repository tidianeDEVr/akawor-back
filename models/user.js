'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        userFirstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userLastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userRole: {
            type: DataTypes.STRING,
            defaultValue: 'ROLE_CLIENT',
            validate: {
                notEmpty: true
            }
        },
        userBirthday: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userIsEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userSalt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        userPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        userIsPhoneVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    },
    {
        paranoid: true
    });

    return user; 
}