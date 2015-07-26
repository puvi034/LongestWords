/**
 * Created by puneethts on 5/22/15.
 */
var app = angular.module('trieStructure');
app.factory('readFile', ['$http', function ($http) {
    var readFile = function (successCall, errorCall) {
        $http.get('src/testData/example.txt').success(function (data, status, headers, config) {
            successCall(data, status, headers, config);

        }).error(function (data, status, headers, config) {
            errorCall(data, status,headers, config);
        });
    }

    return readFile;

}]);
