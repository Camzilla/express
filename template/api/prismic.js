var router = require('express').Router()

var Prismic = require('prismic-nodejs');
var PConfig = require('./../prismic-configuration');

var LINKRESOLVER = function(doc) {
  return '/' + doc.type + '/' + doc.id;
}

function api(req, res) {
    res.locals.ctx = {
        endpoint: PConfig.apiEndpoint,
        linkResolver: LINKRESOLVER
    };
    return Prismic.api(PConfig.apiEndpoint, {
        accessToken: PConfig.accessToken,
        req: req
    });
}

router.get('/prismic', function(req, res) {

    api(req, res).then(function(api) {
        return api.getByID("XXX"); // ID to post, see docs for other api calls https://prismic.io/docs/query-document-by-id-or-uid
    }).then(function(pageContent) {
        res.json(pageContent.data);
    }).catch(function(err) {
        res.status(500).send("Error 500: " + err.message);
    });

});

module.exports = router
