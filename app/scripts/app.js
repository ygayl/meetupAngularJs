var app = angular.module('meetupAngularJSApp', ['app.controller','app.services']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/tweet.html',
            controller: 'TweetCtrl'
        })
        .when('/tweetList', {
            templateUrl: 'partials/tweetList.html',
            controller: 'TweetListCtrl'
        })
        .otherwise({redirectTo:'/'});
}]);

