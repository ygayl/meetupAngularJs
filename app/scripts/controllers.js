/**
 * Created with JetBrains WebStorm.
 * User: yassinegayl
 * Date: 12/09/13
 * Time: 22:48
 * To change this template use File | Settings | File Templates.
 */
var meetup = angular.module("app.controller",['elasticjs.service']);

meetup.controller('TweetCtrl', function myController($scope, ejsResource){

    //alert('Entree dans le TweetCtrl');
    /* instantiate (takes an optional url string) */
    var ejs = ejsResource('http://localhost:9200');

    var index = 'twitter';
    var type = 'tweet';

    // setup the indices and types to search across
    var request = ejs.Request()
        .indices(index)
        .types(type);

    $scope.tweets = request
        .query(ejs.MatchAllQuery())
        .doSearch();

    $scope.search = function(){
        alert('snoop');
        $scope.tweets = request
            .query(ejs.MatchAllQuery())
            .doSearch();

    }

    $scope.addTweet = function(){

        console.log("alias  : " + $scope.tweet.alias);
        console.log("snoop  : " + $scope.tweet.message);
        // our example documents
        var docs = [
            ejs.Document(index, type, '1').source({
                user: 'mrweber',
                message: 'Elastic.js - a Javascript implementation of the ElasticSearch Query DSL and Core API'}),
            ejs.Document(index, type, '2').source({
                user: 'egaumer',
                message: 'FullScale Labs just released Elastic.js go check it out!'
            }),
            ejs.Document(index, type, '3').source({
                user: 'dataintensive',
                message: 'We are pleased to announce Elastic.js an implementation of the #elasticsearch query dsl'
            }),
            ejs.Document(index, type, '4').source({
                user: 'kimchy',
                message: 'The FullScale Labs team are awesome!  Go check out Elastic.js'
            }),
            ejs.Document(index, type, '5').source({
                user: 'egaumer',
                message: 'Use elastic.js to write a complex query and translate it to json with our query translator'
            })
        ];

        // so search is only executed after all documents have been indexed
        var myDoSearch = _.after(docs.length, $scope.search);
        _.each(docs, function (doc) {
            doc.refresh(true).doIndex(myDoSearch);
        });
    }

});

meetup.controller('TweetListCtrl', function myController($scope, TweetsService){
    $scope.tweets = TweetsService.getList();
});


