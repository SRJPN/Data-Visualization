var _ = require('lodash');

exports.parseGenre = function(genreString) {
    return genreString.split('|').map(function(genre) {
        return genre.trim();
    });
};

exports.refineData = function(data) {
    return data.map(function(row) {
        return {
            movie_name: row.movie_title.trim(),
            genres: exports.parseGenre(row.genres),
            content_rating: row.content_rating,
            year: row.title_year
        }
    })
};

exports.aggregateBy = function(list, field, countOf) {
    return list.reduce(function(result, movie) {
        if (!result[movie[field]])
            result[movie[field]] = {
                year: movie[field]
            };
        result[movie[field]][movie[countOf]] = result[movie[field]][movie[countOf]] ? result[movie[field]][movie[countOf]] + 1 : 1;
        return result;
    }, {});
};

exports.removeRowWithEmptyField = function(data, field) {
    return data.filter(function(movie) {
        return movie[field];
    })
};

exports.refiningGenre = function(data) {
    var splittedData = data.map(function(row) {
        return row.genres.map(function(genre) {
            var result = _.clone(row);
            result.genre = genre
            return result;
        })
    })
    return _.flattenDeep(splittedData);
};
