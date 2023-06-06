'use strict';
module.exports = (sequelize, DataTypes) => {
    const shop = sequelize.define('shop', {
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
        shopLogoImageId: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },  
        shopCoverImageId: {
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

    shop.associate = (models) => {
        shop.belongsTo(models.user);
        shop.belongsTo(models.category);
        shop.hasMany(models.product);
        shop.hasOne(models.image);
    };

    return shop; 
}