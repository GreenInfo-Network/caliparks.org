"use strict";

var Association = require("sequelize/lib/associations/base"),
    Model = require("sequelize/lib/model"),
    Transaction = require("sequelize/lib/transaction"),
    Utils = require("sequelize/lib/utils");

var optClone = function(options) {
  return Utils._.cloneDeep(options, function(elem) {
    // The InstanceFactories used for include are pass by ref, so don't clone them.
    if (elem &&
      (
        elem._isSequelizeMethod ||
        elem instanceof Model ||
        elem instanceof Transaction ||
        elem instanceof Association
      )
    ) {
      return elem;
    }
    // Unfortunately, lodash.cloneDeep doesn't preserve Buffer.isBuffer, which we have to rely on for binary data
    if (Buffer.isBuffer(elem)) { return elem; }

    // Otherwise return undefined, meaning, 'handle this lodash'
    return undefined;
  });
};

module.exports = function(sequelize, DataTypes) {
  var Park = sequelize.define("Park", {
    id: {
      type: DataTypes.INTEGER,
      field: "superunit_id"
    },
    name: {
      type: DataTypes.TEXT,
      field: "unit_name"
    },
    managingAgencyId: {
      type: DataTypes.INTEGER,
      field: "mng_ag_id"
    },
    managingAgencyName: {
      type: DataTypes.TEXT,
      field: "mng_agncy"
    },
    access: {
      type: DataTypes.TEXT,
      field: "access_typ"
    },
    acres: {
      type: DataTypes.FLOAT,
      field: "gis_acres"
    // },
    // checkinCount: {
    //   type: DataTypes.INTEGER,
    //   field: "(SELECT 12)"
    }
  }, {
    timestamps: false,
    tableName: "cpad_superunits",
    getterMethods: {
      // checkinCount: function() {
      //   return 9;
      // },
      hasHipcamp: function() {
        return this.getDataValue("Activities") &&
               this.getDataValue("Activities").activities.activityCount > 0;
      },
      hipcampActivities: function() {
        if (this.hasHipcamp) {
          var activities = this.getDataValue("Activities").activities;

          return Object.keys(activities).filter(function(x) {
            return activities[x] === true;
          });
        }

        return [];
      },
      photoCount: function() {
        // TODO add Instagram
        // TODO (longer-term) pull from a stats table
        return (this.getDataValue("FlickrPhotos") || []).length;
      },
      tipCount: function() {
        return 7;
      },
      tweetCount: function() {
        return 12;
      },
      venueCount: function() {
        return 2;
      }
    },
    classMethods: {
      associate: function(models) {
        Park.hasOne(models.HipcampActivities, {
          as: "Activities",
          foreignKey: "su_id"
        });

        Park.hasMany(models.FlickrPhoto, {
          foreignKey: "superunit_id"
        });

        // hack around the fact that defaultScope doesn't respect include

        var _find = Park.find;

        Park.find = function(param, queryOptions) {
          var options = {};

          if (typeof param === "number" || typeof param === "string" || Buffer.isBuffer(param)) {
            options.include = [{ model: models.HipcampActivities, as: "Activities" }];
            options.where = {};
            options.where[this.primaryKeyAttribute] = param;
          } else {
            // post-rc2, this is available as Model.prototype.__optClone
            options = optClone(param);

            options.include = options.include || [];

            options.include.push({
              model: models.HipcampActivities,
              as: "Activities"
            });
          }

          return _find.call(this, options, queryOptions);
        };
      }
    }
  });

  return Park;
};
