/**
 * Created with JetBrains WebStorm.
 * User: yassinegayl
 * Date: 15/09/13
 * Time: 04:10
 * To change this template use File | Settings | File Templates.
 */
'use strict';

var servicesModule = angular.module('app.services', ['elasticjs.service']);

servicesModule.factory('TweetsService', function(ejsResource){
        var tweetsList = {};

        /* instantiate (takes an optional url string) */
        var ejs = ejsResource('http://localhost:9200');

        var index = 'twitter';
        var type = 'tweet';

        // setup the indices and types to search across
        var request = ejs.Request()
            .indices(index)
            .types(type);

        tweetsList = request
            .query(ejs.MatchAllQuery())
            .doSearch();

        return {
            getList: function () {
                return tweetsList;
        }
    };
});