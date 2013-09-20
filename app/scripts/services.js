/**
 * Created with JetBrains WebStorm.
 * User: yassinegayl
 * Date: 15/09/13
 * Time: 04:10
 * To change this template use File | Settings | File Templates.
 */
'use strict';

var servicesModule = angular.module('app.services', ['elasticjs.service']);

servicesModule.factory('TweetsService', function (ejsResource) {
    var tweetsList = {};

    /* instantiate (takes an optional url string) */
    var ejs = ejsResource('http://localhost:9200');

    var index = 'twitter';
    var type = 'tweet';

    // setup the indices and types to search across
    var request = ejs.Request().size(50)
        .indices(index)
        .types(type);

    function tweetIndex(tweet, date) {
        ejs.Document(index, type).source({
            alias: tweet.alias,
            message: tweet.message,
            date: date
        }).doIndex(function () {
                console.log('Success indexing');
            });
    }


    return {
        getList: function () {
            return  request
                .query(ejs.MatchAllQuery())
                .doSearch(function () {
                    console.log('Success search');
                });

        },
        addTweet: function (tweet) {
            tweetIndex(tweet, new Date().getTime());
        },
        getTweet: function(id) {
            alert("tweetID :" + id);
        }

    };
});
