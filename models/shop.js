'use strict';
module.exports = (sequelize, DataTypes) => {
    const Shop = sequelize.define('Shop', {
        shopLibelle: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Boutique-' + Date.now(),
            validate: {
                notEmpty: true
            }
        },
        shopSlug: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Boutique-' + Date.now(),
            validate: {
                notEmpty: true
            }
        },
        shopAddress: {
            type: DataTypes.TEXT,
        },
        shopDescription: {
            type: DataTypes.STRING(600),
            allowNull: false,
            defaultValue: "Bienvenue dans notre boutique en ligne ! Depuis notre création en [date], nous sommes une entreprise spécialisée dans [secteurs d'activités]. Avec une large gamme de [type de produit] de haute qualité, nous nous engageons à vous offrir des produits tendances, confortables et durables. Explorez notre sélection soigneusement conçue pour vous.",
        },
        shopLatitude: {
            type: DataTypes.STRING,
        },
        shopLongitude: {
            type: DataTypes.STRING,
        }, 
        shopWorkingHours: {
            type: DataTypes.STRING,
            defaultValue: "Lundi au vendredi : 8H15 - 16H45.",
            allowNull: true,
        },  
        shopLogoImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },  
    },
    {
        paranoid: true
    });

    Shop.associate = (models) => {
        Shop.belongsTo(models.User);
        Shop.belongsTo(models.Category);
        Shop.hasMany(models.Product);
        Shop.hasOne(models.Social);
    };

    return Shop; 
}