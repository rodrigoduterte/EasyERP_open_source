var express = require('express');
var router = express.Router();
var CustomerHandler = require('../handlers/customer');
var authStackMiddleware = require('../helpers/checkAuth');
var MODULES = require('../constants/modules');

module.exports = function (models, event) {
    'use strict';
    
    var handler = new CustomerHandler(models, event);
    var moduleId = MODULES.COMPANIES;
    var accessStackMiddlware = require('../helpers/access')(moduleId, models);

    router.use(authStackMiddleware);

    router.get('/', accessStackMiddlware, handler.getByViewType);

    router.get('/getCustomersImages', handler.getCustomersImages);
    router.get('/getCompaniesForDd', handler.getCompaniesForDd);
    router.get('/getCompaniesAlphabet', handler.getCompaniesAlphabet);
    // router.get('/exportToXlsx', handler.exportToXlsx);
    // router.get('/exportToCsv', handler.exportToCsv);
    router.get('/totalCollectionLength', accessStackMiddlware, handler.getTotalCount);
    router.post('/', accessStackMiddlware, handler.create);
    router.put('/:id', accessStackMiddlware, handler.update);
    router.patch('/:id', accessStackMiddlware, handler.udateOnlySelectedFields);
    router.delete('/:id', accessStackMiddlware, handler.remove);

    return router;
};