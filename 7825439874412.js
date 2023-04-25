const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get("movie");
const tvName = urlParams.get("tv");

if (document.getElementById("blazer") && document.getElementById('blazer').innerHTML === 'Official <span>Blazer</span> Service') {
if (urlParams.get("movie")) {
document.getElementById('content').style.display = 'none'

   var video = document.getElementById('player');
   video.style.display = 'block';
   var movieId = movieName.match(/\d+$/)[0];

   if (Hls.isSupported()) {
      var hls = new Hls();
      fetch(`https://api.consumet.org/movies/flixhq/watch?episodeId=${movieId}&mediaId=movie/${movieName}`).then(response => {return response.json();}).then(other => {
        hls.loadSource(other.sources[0].url);
      });
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
      });
}
  
plyr.setup(video);
} else {
  const episodeId = urlParams.get("episodeId");
  const mediaId = urlParams.get("mediaId");
  
  if (Hls.isSupported() && episodeId && mediaId) { // Check that episodeId and mediaId are not null
    var hls = new Hls();
    fetch(`https://api.consumet.org/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaId}`)
      .then(response => response.json())
      .then(data => {
        hls.loadSource(data.sources[0].url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
        });
      });
  }
  
  plyr.setup(video);

}

document.querySelector('#location').innerHTML = window.location.href + '?movie=watch-puss-in-boots-the-last-wish-91342';
document.querySelector('#location').onclick = function() {
    window.open("/?movie=watch-puss-in-boots-the-last-wish-91342", "_blank");
}
} else {
  alert('Not an Official service')
  document.body.innerHTML = ''
}
