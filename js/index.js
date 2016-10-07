var papa = require('papaparse');
var fs = require('fs');
var _ = require('lodash');

var dataAsCsv = fs.readFileSync('movie_metadata.csv','utf8');
var data = papa.parse(dataAsCsv,{header: true}).data
data.pop();

var parseGenre = function(genreString){
  return genreString.split('|');
};

var refineData = function(data){
  return data.map(function(row){
    return {
            movie_name: row.movie_title.trim(),
            genres: parseGenre(row.genres),
            content_rating: row.content_rating,
            year: row.title_year
          }
  })
};

var sayan = function(data){
  var splittedData = data.map(function(row){
    return row.genres.map(function(genre){
      var result = _.clone(row);
      result.genre = genre
      return result;
    })
  })
  return _.flattenDeep(splittedData);
};
var suman = sayan(refineData(data));
// var groupedByYear = _.groupBy(suman,'year');

var eliminateUnwantedData = function(data){
  return data.filter(function(movie){
    return movie.year;
  })
};

var pureData =  eliminateUnwantedData(suman);
// console.log(pureData);

var result = {};

pureData.forEach(function(movie){
  if(!result[movie.year]){
    result[movie.year] = {year:movie.year};
  }
  result[movie.year][movie.content_rating] = result[movie.year][movie.content_rating] ? result[movie.year][movie.content_rating]+1 : 1;
});
var somthing = _.values(result);

var final = somthing.sort(function(a,b){
  return Object.keys(b).length - Object.keys(a).length
});
// somthing.map(function(year){
//   var result = []
//   for (var genre in year) {
//     if (genre != 'year') {
//       result.push([year.year,genre,year[genre]]);
//     }
//   }
//   return result;
// });

// console.log(_.flatten(final));


// console.log(eliminateUnwantedData(groupedByYear));
console.log(papa.unparse(final));
// console.log(suman);
