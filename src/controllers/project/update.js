'use strict'

const { Project } = require('../../models');

module.exports = (params, callback) => {
  const { id } = params.params;
  const { name } = params.body;
  validateParams(id)
    .then(() => {
      updateProject(id, name)
        .then(project => callback(null, {status: true, result: project}))
        .catch(error => callback(error, null))
    })
    .catch(error => callback(error, null))
  
};

function validateParams(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject({
        status: false,
        message: 'Must provide an ID to update a project'
      })
    }
    return resolve();
  })
}

function updateProject(id, name) {
  return new Promise((resolve, reject) => {
    try {
      Project.findOneAndUpdate({projectId: id}, {$set: {name: name}}, {new: true})
        .then(project => resolve(project))
    } catch (e) {
      reject({
        status: false,
        message: 'Project not found'
      })
    }
  });
}
