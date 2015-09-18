module.exports = (function() {

    var csv = require('fast-csv');
    var fs = require('fs');
    var Q = require('q');

    var CsvReader = {
        read: function(file) {
            var deferred = Q.defer();

            var readStream = fs.createReadStream(file);

            var data = [];
            var csvStream = csv.fromStream(readStream, {
                headers: true
            }).on('data', function(record) {
                data.push(record);
            }).on('end', function() {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };

    return CsvReader;

}());
