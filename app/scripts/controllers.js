/**
 * Created with JetBrains WebStorm.
 * User: yassinegayl
 * Date: 12/09/13
 * Time: 22:48
 * To change this template use File | Settings | File Templates.
 */
var meetup = angular.module("app.controller", ['elasticjs.service']);

meetup.controller('NewTweetCtrl', function myController($scope, TweetsService) {


    $scope.addTweet = function () {
        TweetsService.addTweet($scope.tweet);
        $scope.tweet = {};
    }

});

meetup.controller('TweetListCtrl', function myController($scope, TweetsService, $location, $timeout) {

/*    function refreshTable() {
        $timeout(function () {
            $scope.tweets = TweetsService.getList();
            refreshTable();
        }, 5000);
    }
    refreshTable();
*/

    $scope.tweets = TweetsService.getList();
    $scope.dateSort = '_source.date';
    $scope.dateSortDescendant = true;
    console.log($scope.tweets);

    $scope.goConsultTweet = function(tweet){
        $location.path('consultTweet/' + tweet._id);
    };
});


