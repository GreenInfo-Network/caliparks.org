"use strict";

module.exports = function(sequelize, DataTypes) {
  var FlickrPhoto = sequelize.define("FlickrPhoto", {
    id: DataTypes.INTEGER,
    photoId: {
      type: DataTypes.INTEGER,
      field: "photo_id"
    },
    metadata: DataTypes.JSON
  }, {
    timestamps: false,
    tableName: "flickr_photos",
    classMethods: {
      associate: function(models) {
        FlickrPhoto.belongsTo(models.Park, {
          foreignKey: "superunit_id"
        });
      }
    }
  });

  return FlickrPhoto;
};
