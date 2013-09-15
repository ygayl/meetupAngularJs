/**
 * Created with JetBrains WebStorm.
 * User: yassinegayl
 * Date: 12/09/13
 * Time: 22:48
 * To change this template use File | Settings | File Templates.
 */
var meetup = angular.module("app.controller", ['elasticjs.service']);

meetup.controller('TweetCtrl', function myController($scope, TweetsService) {


    $scope.addTweet = function () {

        console.log("alias  : " + $scope.tweet.alias);
        console.log("snoop  : " + $scope.tweet.message);
        TweetsService.addNewTweet($scope.tweet.alias, $scope.tweet.message, new Date().getTime());


    }

});

meetup.controller('TweetListCtrl', function myController($scope, TweetsService, $timeout) {

    function refreshTable() {
        $timeout(function () {
            $scope.tweets = TweetsService.getList();
            refreshTable();
        }, 1000);

    }

    refreshTable();


});


