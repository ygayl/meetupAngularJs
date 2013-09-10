'use strict';

var meetup = angular.module("meetupAngularJSApp",[]);

meetup.controller('myController', function myController($scope, $http){
    // mapping data
    $scope.tweet = {} ;

    $scope.add = function(tweet){
        console.log("snoop  : " + tweet.libelle);
        $http.put('http://localhost:9200/twitter/tweet/1')
            .success(function(data) {
                $scope.items = data;
            })
            .error(function (data){
                $scope.error = data;
            })
    }

    $http.get('http://localhost:9200/twitter/tweet/1')
        .success(function (data){
            $scope.catalogue = data;
        })
        .error(function (data){
            $scope.catalogue = data;
        })
});


