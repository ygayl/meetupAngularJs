var app = angular.module('meetupAngularJSApp', ['app.controller', 'app.services', 'app.tweetFilters', 'ui.bootstrap']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/tweet.html',
            controller: 'NewTweetCtrl'
        })
        .when('/consultTweet/:tweetId', {
            templateUrl: 'partials/consultTweet.html',
            controller: 'ConsultTweetCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);

