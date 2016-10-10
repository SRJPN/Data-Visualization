var papa = require('papaparse');
var fs = require('fs');
var _ = require('lodash');
var lib = require('./lib');
var file_name = "./movie_metadata.csv";
var genre_file = './public/data/genre.json';
var content_rating_file = './public/data/content_rating.json';


var getData = function(fileName) {
    console.log(file_name)
    var dataAsCsv = fs.readFileSync(file_name, 'utf8');
    var data = papa.parse(dataAsCsv, {
        header: true
    }).data
    data.pop();
    return data;
};

var generateDataForContentRating = function(data) {
    var pureData = lib.removeRowWithEmptyField(lib.refineData(data), 'year');
    var somthing = _.values(lib.aggregateBy(pureData, 'year', 'content_rating'));
    return JSON.stringify(somthing)
};

var generateDataForGenre = function(data) {
    var suman = lib.refiningGenre(lib.refineData(data));
    var pureData = lib.removeRowWithEmptyField(suman, 'year');
    var somthing = _.values(lib.aggregateBy(pureData, 'year', 'genre'));
    return JSON.stringify(somthing)
};

var data = getData();
fs.writeFileSync(genre_file, generateDataForGenre(data));
fs.writeFileSync(content_rating_file, generateDataForContentRating(data));
