'use strict'

const { Project } = require('../../models');

module.exports = (params, callback) => {
  const { id } = params;

  if (!id) {
    return callback({
      status: false,
      message: 'Must provide a ID to delete a project.'
    }, null)
  }
  
  Project.deleteOne({projectId: id})
    .then(project => callback(null, {status: true, result: project}))
};
