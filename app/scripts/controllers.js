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

    $scope.addTweet = function () {
        TweetsService.addTweet($scope.tweet, function () {
            SharedModelService.updateTweets();
            $scope.tweets = SharedModelService.tweets;
            $scope.tweet = {};
        });
    }

});

meetup.controller('TweetListCtrl', function myController($scope, $location) {

    $scope.dateSort = '_source.date';
    $scope.dateSortDescendant = true;
    $scope.numLimit = 5;

    function updateStatusBar() {
        $scope.hasMore = false;
        $scope.isTweet = true;
        if (!$scope.tweets.$$v || $scope.tweets.$$v.hits.total == 0) {
            $scope.isTweet = false;

        } else if ($scope.tweets.$$v.hits.total > $scope.numLimit) {
            $scope.hasMore = true;
        }
    }


    $scope.$watch('tweets', function () {
        console.log('New tweet,list updated!');
        console.log($scope.tweets);
        updateStatusBar();
    });

    $scope.show_more = function () {
        $scope.numLimit += 5;
        updateStatusBar();
    }

    $scope.goConsultTweet = function (tweet) {
        $location.path('consultTweet/' + tweet._id);
    };
});


meetup.controller('ConsultTweetCtrl', function myController($scope, $routeParams, TweetsService) {
    $scope.tweet = TweetsService.getTweet($routeParams.tweetId);
});