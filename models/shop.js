'use strict';
module.exports = (sequelize, DataTypes) => {
    const Shop = sequelize.define('Shop', {
        shopLibelle: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'boutique-' + Date.now(),
            validate: {
                notEmpty: true
            }
        },
        shopSlug: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'boutique-' + Date.now(),
            validate: {
                notEmpty: true
            }
        },
        shopAddress: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            },
        },
        shopDescription: {
            type: DataTypes.TEXT,
            defaultValue: `Bienvenue dans notre boutique en ligne ! 
                            Depuis notre création en [date], 
                            nous sommes une entreprise spécialisée dans [secteurs d'activités]. 
                            Avec une large gamme de [type de produit] de haute qualité, 
                            nous nous engageons à vous offrir aux parents des produits tendances, 
                            confortables et durables. En tant qu'entreprise éthique, 
                            nous privilégions les partenariats avec des fournisseurs 
                            locaux et favorisons des pratiques de fabrication 
                            respectueuses de l'environnement. 
                            Explorez notre sélection soigneusement conçue pour vous.`
        },
        shopLatitude: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            },
        },
        shopLongitude: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            },
        }, 
        shopWorkingHours: {
            type: DataTypes.STRING,
            defaultValue: "Lundi au vendredi : 8H15 - 16H45.",
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },  
        shopLogoImage: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
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