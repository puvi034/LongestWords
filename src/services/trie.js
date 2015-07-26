/**
 * Created by puneethts on 5/22/15.
 */
var app = angular.module('trieStructure');
app.factory('trie', [function () {


    function trie() {
        this.words = 0;
        this.prefixes = 0;
        this.children = [];
    }

    trie.prototype.insertWord = function (word, pos) {
        if (word.length == 0) {
            return;
        }
        var T = this, k, child;
        if (pos == undefined) {
            pos = 0;
        }
        if (pos == word.length) {
            T.words++;
            return;
        }
        T.prefixes++;
        k = word[pos];
        if (T.children[k] == undefined) {
            T.children[k] = new trie();
        }
        child = T.children[k];
        child.insertWord(word, pos + 1);
    }

    trie.prototype.find = function (word) {
        if (word.length == 0) {
            return false;
        }
        if (this.countWord(word) > 0) {
            return true;
        } else {
            return false;
        }
    }

    trie.prototype.countWord = function (str, pos) {
        if (str.length == 0) {
            return 0;
        }

        var T = this,
            k,
            child,
            ret = 0;

        if (pos === undefined) {
            pos = 0;
        }
        if (pos === str.length) {
            return T.words;
        }
        k = str[pos];
        child = T.children[k];
        if (child !== undefined) { //node exists
            ret = child.countWord(str, pos + 1);
        }
        return ret;
    }

    trie.prototype.remove = function (word, pos) {
        if (word.length == 0) {
            return;
        }

        var T = this,
            k,
            child;

        if (pos === undefined) {
            pos = 0;
        }
        if (T === undefined) {
            return;
        }
        if (pos === word.length) {
            T.words--;
            return;
        }
        T.prefixes--;
        k = word[pos];
        child = T.children[k];
        child.remove(word, pos + 1);
    }

    trie.prototype.add = function (word) {
        if (word.length == 0)
            return;
        this.insertWord(word);
    }

    trie.prototype.isCompoundWord = function (word, isExist) {
        if (isExist) {
            this.remove(word);
        }
        for (var i = 0; i < word.length; i++) {
            if (this.find(word.substring(0, i + 1))) {
                if (i + 1 == word.length || this.isCompoundWord(word.substring(i + 1, word.length))) {
                    return true;
                }
            }
        }
        if (isExist) {
            this.add(word);
        }
        return false;
    }

    return trie;
}]);
