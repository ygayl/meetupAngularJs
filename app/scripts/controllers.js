/**
 * Created with JetBrains WebStorm.
 * User: yassinegayl
 * Date: 12/09/13
 * Time: 22:48
 * To change this template use File | Settings | File Templates.
 */
var meetup = angular.module("app.controller", []);

meetup.controller('NewTweetCtrl', function myController($scope, TweetsService, SharedModelService) {
    $scope.tweets = SharedModelService.tweets;
    console.log($scope.tweets);

    $scope.addTweet = function () {
        TweetsService.addTweet($scope.tweet, function () {
            SharedModelService.updateTweets();
            $scope.tweets = SharedModelService.tweets;
        });
    }

});

meetup.controller('TweetListCtrl', function myController($scope, $location) {
    $scope.dateSort = '_source.date';
    $scope.dateSortDescendant = true;

    $scope.goConsultTweet = function (tweet) {
        $location.path('consultTweet/' + tweet._id);
    };
});


meetup.controller('ConsultTweetCtrl', function myController($scope, $routeParams, TweetsService) {
    $scope.tweet = TweetsService.getTweet($routeParams.tweetId);
});