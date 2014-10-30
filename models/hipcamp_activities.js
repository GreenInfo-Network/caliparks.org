"use strict";

module.exports = function(sequelize, DataTypes) {
  var HipcampActivities = sequelize.define("HipcampActivities", {
    id: {
      type: DataTypes.INTEGER,
      field: "su_id"
    },
    activities: DataTypes.JSON
  }, {
    timestamps: false,
    tableName: "site_hipcamp_activities",
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return HipcampActivities;
};
