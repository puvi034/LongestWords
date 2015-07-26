/**
 * Created by puneethts on 5/22/15.
 */
var app = angular.module('trieStructure');
app.controller('trieController', ['$scope', 'readFile', 'trie', function ($scope, readFile, trie) {
    // reads the input file using xmlHttpRequest
    readFile(success, error);

    $scope.longestCompoundWord = '';
    $scope.secondLongestCompoundWord = '';
    $scope.numberOfCompundWords = '';


    // on success of readFile
    function success(data, status, headers, success) {
        var wordList = data.split('\n');
        var compoundList = [];
        wordList.sort();
        var T = new trie();
        angular.forEach(wordList, function (value, key) {
            T.insertWord(value);
        });
        wordList.reverse();
        angular.forEach(wordList, function (value, key) {
            if (T.isCompoundWord(value, true)) {
                compoundList.push(value);
            }
        });
        compoundList.sort(function (a, b) {
            return b.length - a.length;
        });
        $scope.longestCompoundWord = compoundList[0];
        $scope.secondLongestCompoundWord = compoundList[1];
        $scope.numberOfCompundWords = compoundList.length;

    }

    //on failure of readFile
    function error(data, status, headers, success) {
        alert(data);
    }
}]);
