var _ = require('lodash');
var RSVP = require('rsvp');
var normalizr = require('normalizr');

var tree = require('../tree');

function updateIndexes(entities, indexes) {
  _.each(entities, function(entityGroup, name) {
    _.each(indexes[name] || {}, function(index, attr) {
      var cursor = tree.select(index);
      _.each(entityGroup, function(entity, id) {
        var value = entity[attr];
        if (value) {
          cursor.select(value).edit(id);
        }
      });
    });
  });
}

exports.reqPromise = function(req) {
  return new RSVP.Promise(function(resolve, reject) {
    req.end(function(err, res) {
      if (err) {
        reject(err);
      } else if (res.body.status === 'success') {
        resolve(res.body.data);
      } else {
        reject(res.body);
      }
    });
  });
};

exports.addData = function(req, data) {
  return req.field('data', JSON.stringify(data));
};

exports.addImages = function(req, images) {
  _.each(images, function(image, n) {
    var data = image;
    if (image.file) {
      data = _.omit(image, ['file', 'src']);
    }
    req.field('data' + n, JSON.stringify(data));
    if (image.file) {
      req.attach('data' + n + 'File', image.file);
    }
  });
  return req;
};

exports.handleResponse = function(req, options) {
  var limit = options.limit || 100;

  if (options.stateCursor) {
    var state = options.stateCursor.get() || {};

    // Skip if already loading
    if (state.loading || state.completed) {
      return RSVP.resolve();
    }

    if (options.paged) {
      req.query({
        offset: state.offset || 0,
        limit: limit
      });
    }

    options.stateCursor.select('loading').edit(true);
  }

  return exports.reqPromise(req)
    .then(function(data) {
      data = normalizr.normalize(data, options.schema);

      // Update indexes.
      if (options.indexes) {
        updateIndexes(data.entities, options.indexes);
      }

      if (options.stateCursor) {
        options.stateCursor.select('loading').edit(false);

        var items;
        if (options.getPageItems) {
          items = options.getPageItems(data);
        } else if (options.paged) {
          items = data.result;
        }

        if (items) {
          var offset = options.stateCursor.select('offset').get() || 0;

          if (items.length < limit) {
            options.stateCursor.select('complete').edit(true);
          }

          options.stateCursor.select('offset').edit(offset + items.length);
        }
      }

      // Send data to callbacks
      if (options.onData) {
        return options.onData(data);
      }

      return data;
    });
};

exports.lpush = function(cursor, items) {
  var allItems = [].concat(items).concat(cursor.get() || []);
  cursor.edit(allItems);
};

exports.rpush = function(cursor, items) {
  var allItems = (cursor.get() || []).concat(items);
  cursor.edit(allItems);
};

exports.merge = function(cursor, scopes, entities) {
  _.each(scopes, function(scope) {
    var scopeCursor = cursor.select(scope);
    var data = _.extend({}, scopeCursor.get(), entities);
    scopeCursor.edit(data);
  });
};

exports.getWithKey = function(entity) {
  var data = {};
  data[entity.id] = entity;
  return data;
};
