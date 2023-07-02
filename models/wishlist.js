'use strict';
module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('Wishlist', {
        
    },
    {
        paranoid: true
    });

    Wishlist.associate = (models) => {
        Wishlist.belongsTo(models.User);
        Wishlist.hasMany(models.Product)
    };
    
    return Wishlist; 
}