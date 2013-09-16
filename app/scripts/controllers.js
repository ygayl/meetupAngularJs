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
    console.log($scope.tweets);

    $scope.go = function (path) {
        $location.path(path);
    };
});


