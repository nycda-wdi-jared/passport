'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    fav_veggie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fav_fruit: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Profile.belongsTo(models.User)
      }
    }
  });
  return Profile;
};