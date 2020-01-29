/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const replyRoutes = require('./replyRoutes');
const threadRoutes = require('./threadRoutes');

module.exports = function (app) {
  threadRoutes(app);
  replyRoutes(app);
};