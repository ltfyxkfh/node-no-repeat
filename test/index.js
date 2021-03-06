var redis = require('redis');
var should = require('should');
var client = redis.createClient({
    host: '127.0.0.1',
    db: 1
});
var NoRepeat = require('../index');
var noRepeat = new NoRepeat(client);
var name = `test${Math.random()*10000}`;

describe('noRepeat: 1 times/second', function() {
    describe('isRepeat', function() {
        it('should be true at the first time', function(done) {
            noRepeat.isRepeat({
                name: name,
                ttl: 1
            }, (error, result) => {
                should.exist(result);
                result.should.equal(true);
                done(error, result);
            })
        })
        it('should be false at the second time', function(done) {
            noRepeat.isRepeat({
                name: name,
                ttl: 1
            }, (error, result) => {
                should.exist(result);
                result.should.equal(false);
                done(error, result);
            })
        })

        it('should be true after 1 second', function(done) {
            setTimeout(function() {
                noRepeat.isRepeat({
                    name: name,
                    ttl: 1
                }, (error, result) => {
                    should.exist(result);
                    result.should.equal(true);
                    done(error, result);
                })
            }, 1000)
        })
    })
})
