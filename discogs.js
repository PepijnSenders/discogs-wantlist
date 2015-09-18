module.exports = (function() {

    var request = require('request');
    var Q = require('q');

    var base = 'https://api.discogs.com';

    var Discogs = {
        addToWantlist: function(releaseId) {
            var deferred = Q.defer();

            console.log('Release ID', releaseId);

            var url = '{base}/users/{username}/wants/{release_id}?notes={notes}&rating={rating}'.assign({
                base: base,
                username: encodeURIComponent(process.env.USERNAME),
                release_id: encodeURIComponent(releaseId),
                notes: encodeURIComponent('Added by Pepijns bot'),
                rating: encodeURIComponent(0)
            });

            request({
                method: 'PUT',
                url: url,
                form: {
                    test: 'test'
                },
                headers: {
                    'Authorization': 'Discogs token={token}'.assign({
                        token: process.env.ACCESS_TOKEN
                    })
                }
            }, function(error, response, body) {
                if (error) {
                    console.error(error);
                }
                deferred.resolve();
            });

            return deferred.promise;
        }
    };

    return Discogs;

}());
