$(function() {
  console.log('DOM Ready');
});

var artists;

$.get('/artist/get')
  .success(function (res) {
    artists = res;
  });

$('.artistSearch').on('keyup', function() {
  var query = $('.artistSearch').val();
  console.log('query: ', query);
  var matchingArtists = [];
  artists.forEach(function(artist) {
    if (artist.name.indexOf(query) !== -1) {
      matchingArtists.push(artist);
    }
  });
  console.log('matchingArtists: ', matchingArtists);
  var html = '<ul>';
  matchingArtists.forEach(function (matchingArtist) {
    html += '<li>' + matchingArtist.name + '</li>';
  });
  html += '</ul>';
  $('.results').html(html);
});

$('.results').on('click', 'li', function () {
  $('.artistSearch').val($(this).text());
});
