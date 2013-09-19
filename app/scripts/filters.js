/**
 * Created with JetBrains WebStorm.
 * User: aelmanaa
 * Date: 17/09/13
 * Time: 21:15
 * To change this template use File | Settings | File Templates.
 */

var app = angular.module('app.tweetFilters', []);


app.filter('tweetFilter', function () {

    return function (inputs, aliasQ, messageQ) {
        if (!angular.isArray(inputs)) return inputs;
        if (!aliasQ && !messageQ) return inputs;
        var inputsCopy = [];

        function isFound(input, aliasQ, messageQ) {
            var alias = input._source.alias;
            var message = input._source.message;
            if (aliasQ != undefined && messageQ != undefined) {
                return (alias.indexOf(aliasQ) != -1 && message.indexOf(messageQ) != -1) ? true : false;
            } else if (aliasQ != undefined) {
                return alias.indexOf(aliasQ) != -1 ? true : false;
            } else {
                return message.indexOf(messageQ) != -1 ? true : false;
            }
        }


        for (var i = 0; i < inputs.length; i++) {
            if (isFound(inputs[i], aliasQ, messageQ)) {
                inputsCopy.push(inputs[i]);
            }
        }

        return inputsCopy;
    };


});

