'use strict';
module.exports = function(Session) {
  /**
   * Calcul des stats de sessions
   *
   * @param {Function(Error, Object)} cb
   */
  Session.stats = function(cb) {
    var collection = Session.getDataSource().connector.collection(Session.modelName);
    collection.aggregate({
       $group: {
         _id: null,
         totalDistance: { $sum: "$distance"},
         totalDuration: { $sum: "$duration"}, // not use!
         distanceMax: { $max: "$distance"},
         generalAvgSpeed: { $avg: "$speed_avg"},
         speedAvgRecord: { $max: "$speed_avg"},
         speedMaxRecord: { $max: "$speed_max"},
         longuestSession: { $max: "$duration"},
       }
     }, function(err, data) {
       if (err) return cb(err);
       return cb(null, data.pop());
    });
  };

  Session.remoteMethod('stats', {
    isStatic: true,
    http: {
      verb: 'get'
    },
    returns: [
      {arg: 'stats', type: 'Object'}
    ]
  });

  /**
   * Calcul du nombres de sessions par an
   *
   * @param {Function(Error, Object)} cb
   */
   Session.countByYear = function(cb) {
     var collection = Session.getDataSource().connector.collection(Session.modelName);
     collection.aggregate([{
       "$group": {
         "_id": {
           "year": { "$substr": [ "$date", 0, 4 ] }
         },
         "count": { "$sum": 1 }
       }
     }], function(err, data) {
       if (err) return cb(err);
       return cb(null, data);
     });
   };

  Session.remoteMethod('countByYear', {
    isStatic: true,
    http: {
      verb: 'get'
    },
    returns: [
      {arg: 'countByYear', type: 'Object'}
    ]
  });

  /**
   * Calcul du nombres de sessions par an
   *
   * @param {Function(Error, Object)} cb
   */
   Session.countByYearAndMonth = function(cb) {
     var collection = Session.getDataSource().connector.collection(Session.modelName);
     collection.aggregate([{
       "$group": {
         "_id": {
           "year": { "$substr": [ "$date", 0, 4 ] },
           "month": { "$substr": [ "$date", 5, 2 ] }
         },
         "count": { "$sum": 1 }
       }
     }], function(err, data) {
       if (err) return cb(err);
       return cb(null, data);
     });
   };

  Session.remoteMethod('countByYearAndMonth', {
    isStatic: true,
    http: {
      verb: 'get'
    },
    returns: [
      {arg: 'countByYearAndMonth', type: 'Object'}
    ]
  });
};
