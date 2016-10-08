var lib = require('../js/lib.js');
const assert = require('assert');

describe('parseGenre', function() {
    it('returns the genre if only one but in array', function() {
        assert.deepEqual(['Drama'], lib.parseGenre('Drama'))
    });
    it('parse the genre string seperated by | and returns a array of genres', function() {
        assert.deepEqual(['Drama', 'Comedy', 'Romatic'], lib.parseGenre('Drama|Comedy|Romatic'))
        assert.deepEqual(['Musical Film', 'Drama'], lib.parseGenre('Musical Film|Drama'))
    });
    it('trims off the unwanted space at the ends', function() {
        assert.deepEqual(['Drama', 'Comedy'], lib.parseGenre('Drama | Comedy'))
    });
});

describe('parseGenre', function() {
    it('returns the genre if only one but in array', function() {
        assert.deepEqual(['Drama'], lib.parseGenre('Drama'))
    });
    it('parse the genre string seperated by | and returns a array of genres', function() {
        assert.deepEqual(['Drama', 'Comedy', 'Romatic'], lib.parseGenre('Drama|Comedy|Romatic'))
        assert.deepEqual(['Musical Film', 'Drama'], lib.parseGenre('Musical Film|Drama'))
    });
    it('trims off the unwanted space at the ends', function() {
        assert.deepEqual(['Drama', 'Comedy'], lib.parseGenre('Drama | Comedy'))
    });
});
