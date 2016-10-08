var papa = require('papaparse');
var fs = require('fs');
var _ = require('lodash');
var lib = require('./lib');
const file_name = 'movie_metadata.csv';


var getData = function(fileName) {
    var dataAsCsv = fs.readFileSync(fileName, 'utf8');
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

console.log(generateDataForGenre(getData(file_name)));
