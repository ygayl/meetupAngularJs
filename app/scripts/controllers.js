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


    $scope.addTweet = function () {
        TweetsService.addTweet($scope.tweet, function () {
            $scope.model.updateTweets();
            $scope.tweets = $scope.model.tweets;
        });
    }

});

meetup.controller('TweetListCtrl', function myController($scope, $location) {


    $scope.$watch('tweets', function () {
        console.log('New tweet,list updated!');
    });
    $scope.dateSort = '_source.date';
    $scope.dateSortDescendant = true;

    $scope.goConsultTweet = function (tweet) {
        $location.path('consultTweet/' + tweet._id);
    };
});


