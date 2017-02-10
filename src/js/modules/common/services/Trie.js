(function() {
    var services = angular.module('app.common.services');

    services.factory("Trie", function() {

        var Trie = function() {
            this.numOfWords = 0;
            this.numOfPrefixes = 0;
            this.children = [];
        };

        /**
         * Add a new prefix to the trie
         *
         * @param {String} value
         * @param {Number} index (optional)
         */
        Trie.prototype.addPrefix = function(value, index) {
            if (!index) {
                index = 0;
            }
            if (value.length === 0) {
                return;
            }
            if (index === value.length) {
                this.numOfWords++;
                return;
            }

            this.numOfPrefixes++;
            var key = value[index];
            if (this.children[key] === undefined) {
                this.children[key] = new Trie();
            }
            var child = this.children[key];
            child.addPrefix(value, index + 1);
        };

        /**
         * Remove a node form the trie
         *
         * @param {String} value
         * @param {Number} index (optional)
         */
        Trie.prototype.removeNode = function(value, index) {
            if (!index) {
                index = 0;
            }
            if (value.length === 0) {
                return;
            }
            if (index === value.length) {
                this.numOfWords--;
            } else {
                this.numOfPrefixes--;
                var key = value[index];
                var child = this.children[key];
                child.removeNode(value, index + 1);
            }
        };

        /** Get the count of instances of a word in the entire trie
         *
         * @param {String} word
         * @param {Number} index (optional)
         */
        Trie.prototype.wordCount = function(word, index) {
            if (!index) {
                index = 0;
            }
            if (value.length === 0) {
                return 0;
            }
            if (index === value.length) {
                return this.numOfWords;
            } else {
                var key = value[index];
                var child = this.children[key];
                if (child) {
                    return child.wordCount(value, index + 1);
                } else {
                    return 0;
                }
            }
        };

        /** Get the count of instances of a prefix in the enture trie
         *
         * @param {String} prefix
         * @param {Number} index
         */
        Trie.prototype.prefixCount = function(prefix, index) {
            if (!index) {
                index = 0;
            }
            if (prefix.length === 0) {
                return 0;
            }
            if (index === prefix.length) {
                return this.numOfPrefixes;
            } else {
                var key = prefix[index];
                var child = this.children[key];
                if (child) {
                    return child.prefixCount(prefix, index + 1);
                } else {
                    return 0;
                }
            }
        };

        /**
         * Check if a word exists in the trie
         *
         * @param {String} value
         */
        Trie.prototype.wordExists = function(value) {
            if (value.length === 0) {
                return false;
            }
            return this.wordCount(value) > 0;
        };

        /**
         * Return all words with a prefix
         *
         * @param {String} prefix
         */
        Trie.prototype.allChildWords = function(prefix) {
            if (!prefix) {
                prefix = '';
            }

            var words = [];
            if (this.numOfWords > 0) {
                words.push(prefix);
            }

            for (key in this.children) {
                var child = this.children[key];
                words = words.concat(child.allChildWords(prefix + key));
            }
            return words;
        }

        /**
         * Perform a search in the current trie
         *
         * @param {String} prefix
         * @param {Number} index
         */
        Trie.prototype.search = function(prefix, index) {
            if (!index) {
                index = 0;
            }
            if (prefix.length === 0) {
                return [];
            }

            var key = prefix[index];
            var child = this.children[key];
            if (!child) {
                return [];
            } else {
                if (index === prefix.length - 1) {
                    return child.allChildWords(prefix);
                } else {
                    return child.search(prefix, index + 1);
                }
            }
        };

        /**
         * Return the constructor function
         */
        return Trie;
    });

}());
