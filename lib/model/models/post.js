'use strict'
module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return Post
}
