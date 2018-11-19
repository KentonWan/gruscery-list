'use strict';
module.exports = (sequelize, DataTypes) => {
  var List = sequelize.define('List', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.hasMany(models.Item,{
      foreignKey:"listId",
      as: "items"
    })
  };
  return List;
};