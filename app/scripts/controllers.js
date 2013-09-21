/**
 * Created with JetBrains WebStorm.
 * User: yassinegayl
 * Date: 12/09/13
 * Time: 22:48
 * To change this template use File | Settings | File Templates.
 */
var meetup = angular.module("app.controller", []);


meetup.factory('sharedModel', function (TweetsService) {
    var Session = function () {
        this.tweets = TweetsService.getList(function () {
            console.log('init tweets list');
        });
        this.selectedTweetId = "";
    };

    Session.prototype.updateTweets = function () {
        var self = this;
        self.tweets = TweetsService.getList(function () {
            console.log('update tweets list');
        });
    };

    return new Session();
});

meetup.controller('NewTweetCtrl', function myController($scope, TweetsService, sharedModel) {

    $scope.model = sharedModel;
    $scope.tweets = $scope.model.tweets;


    $scope.page = 1;
    $scope.families = [];
    $scope.more = true;
    $scope.status_bar = "";


    $scope.addTweet = function () {
        TweetsService.addTweet($scope.tweet, function () {
            $scope.model.updateTweets();
            $scope.tweets = $scope.model.tweets;
        });
    }

});

meetup.controller('TweetListCtrl', function myController($scope, $location, $filter) {
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
        console.log(tweet);
        $scope.model.selectedTweetId = tweet._id;
        $location.path('consultTweet/' + tweet._id);
    };
});


meetup.controller('ConsultTweetCtrl', function myController($scope, sharedModel, TweetsService) {
    $scope.model = sharedModel;
    console.log('selected tweet: ' + $scope.model.selectedTweetId);
    $scope.tweet = TweetsService.getTweet($scope.model.selectedTweetId, function () {
        console.log('display selected tweet');
    })
    //todo

});