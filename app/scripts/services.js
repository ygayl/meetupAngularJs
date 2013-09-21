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


    function tweetIndex(tweet, date, callbackFn) {
        ejs.Document(index, type).source({
            alias: tweet.alias,
            message: tweet.message,
            date: date
        }).refresh(true).doIndex(function () {
                console.log('Success indexing');
                callbackFn();
            });
    }


    return {
        getList: function (callbackFn) {
            // setup the indices and types to search across
            var request = ejs.Request().size(50)
                .indices(index)
                .types(type);
            return  request
                .query(ejs.MatchAllQuery())
                .doSearch(function () {
                    console.log('Success search');
                    callbackFn();
                });

        },
        addTweet: function (tweet, callbackFn) {
            tweetIndex(tweet, new Date().getTime(), callbackFn);
        },
        getTweet: function (id) {
            alert("tweetID :" + id);
        }
    };
});
