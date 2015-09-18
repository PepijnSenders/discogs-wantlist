require('sugar');
require('dotenv').load();

module.exports = (function() {

    var yargs = require('yargs');
    var CsvReader = require('./csv-reader');
    var Discogs = require('./discogs');
    var Q = require('q');

    var argv = yargs.argv;

    var files = argv.files.split(',');

    Q.allSettled(files.map(function(file) {
        return CsvReader.read(file);
    })).then(function(results) {
        var releases = results.map(function(result) {
            return result.value;
        }).flatten();

        function addToWantlist(release, next) {
            Discogs.addToWantlist(release.release_id).then(next);
        }

        var next = function() {
            releases.shift();
            addToWantlist(releases[0], next);
        };

        addToWantlist(releases[0], next);
    }).catch(function(e) {
        console.error(e);
    });

}());
