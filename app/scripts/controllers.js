/**
 * Created with JetBrains WebStorm.
 * User: yassinegayl
 * Date: 12/09/13
 * Time: 22:48
 * To change this template use File | Settings | File Templates.
 */
var meetup = angular.module("app.controller", []);

meetup.controller('NewTweetCtrl', function ($scope, TweetsService, SharedModelService) {
    $scope.tweets = SharedModelService.tweets;

    $scope.addTweet = function () {
        TweetsService.addTweet($scope.tweet, function () {
            SharedModelService.updateTweets();
            $scope.tweets = SharedModelService.tweets;
            $scope.tweet = {};
        });
    }

});

meetup.controller('TweetListCtrl', function ($scope, $location) {

    $scope.numLimit = 5;

    $scope.show_more = function () {
        $scope.numLimit += 5;
    }

    $scope.goConsultTweet = function (tweet) {
        $location.path('consultTweet/' + tweet._id);
    };
});


meetup.controller('ConsultTweetCtrl', function ($scope, $routeParams, TweetsService) {
    $scope.tweet = TweetsService.getTweet($routeParams.tweetId);
});