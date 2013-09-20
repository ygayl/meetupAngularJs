var app = angular.module('meetupAngularJSApp', ['app.controller', 'app.services']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/tweet.html',
            controller: 'NewTweetCtrl'
        })
        .when('/tweetList', {
            templateUrl: 'partials/tweetList.html',
            controller: 'TweetListCtrl'
        })
        .when('/consultTweet/:tweetId', {
            templateUrl: 'partials/consultTweet.html',
            controller: 'ConsultTweetCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);

