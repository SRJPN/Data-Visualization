$(document).ready(function() {
    $.getJSON("data/content_rating.json", function(data, error) {
        console.log(data);
    });
});
