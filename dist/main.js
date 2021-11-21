const playBtn     = document.querySelector('.play');
const pauseBtn    = document.querySelector('.pause');
const fwdBtn      = document.querySelector('.next-track');
const bwdBtn      = document.querySelector('.prev-track');
const nowPlaying  = document.querySelector('.now-playing');
const trackArt    = document.querySelector('.track-art');
const trackName   = document.querySelector('.track-name');
const trackArtist = document.querySelector('.track-artist');
const currentTime = document.querySelector('.current-time');
const totalTime   = document.querySelector('.total-duration');
const seekSlider  = document.querySelector('#seeker-slide');
// const shuffleBtn  = document.querySelector('.shuffleBtn');
// const repeatBtn   = document.querySelector('.repeat-button');
const albumName   = document.querySelector('.name');
const albumYear   = document.querySelector('.year');

//global values
let isPlaying  = false;
let trackIndex = 0;
let loop       = false;
let updateTimer;

//create tracklist
let trackList = [
    {
        name: "JT",
        artist: "Jon Bellion",
        album: "Glory Sound Prep",
        year: "2020",
        path: "./music/JT.mp3"
    },
    {
        name: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        year: "1975",
        path: "./music/Bohemian_Rhapsody.mp3"
    },
    {
        name: "Flying Without Wings",
        artist: "West Life",
        album: "Flying Without Wings",
        year: "1999",
        path: "./music/Flying_Without_Wings.mp3"
    },
    {
        name: "Silver & Gold",
        artist: "WILD",
        album: "Silver & Gold",
        year: "2016",
        path: "./music/Silver_Gold.mp3"
    },
    {
        name: "Real Life ft. Stormzy",
        artist: "Burna Boy",
        album: "Twice as Tall",
        year: "2020",
        path: "./music/Real_life.mp3"
    },
    {
        name: "Uber Everywhere",
        artist: "Travis $cott",
        album: "Uber Everywhere",
        year: "2016",
        path: "./music/Uber_Everywhere.mp3"
    }
]


//create audio element for player
let currentTrack = document.createElement('audio');


function loadTrack(trackIndex) {
    //  this clears the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // load a new track
    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();
    
    // update details of the track
    trackArt.style.backgroundImage =
        "url(" + trackList[trackIndex].image + ")";
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    albumName.textContent = 'Album: '+trackList[trackIndex].album;
    albumYear.textContent = 'Year: '+trackList[trackIndex].year
    nowPlaying.textContent =
        "PLAYING " + (trackIndex + 1) + " OF " + trackList.length;
    
    // set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // move to the next track if the current finishes playing using the 'ended' event
    currentTrack.addEventListener("ended", nextTrack);
}
loadTrack(trackIndex);

// Function to reset all values to their default
function resetValues() {
    currentTime.textContent = "00:00";
    totalTime.textContent = "00:00";
    seekSlider.value = 0;
}

// buttons are assigned to functions
playBtn.addEventListener('click', function playTrack(){
    //trigger.checked = "checked";
    currentTrack.play();
    isPlaying = true;
    if(isPlaying) {
    document.querySelector(".dots").style.animationPlayState = "running"
    }
});
pauseBtn.addEventListener('click', function(){
    //trigger.checked = null;
    currentTrack.pause();
    isPlaying = false;
    if(!isPlaying) {
    document.querySelector(".dots").style.animationPlayState = "paused"
    }
});

function playTrack() {
    // Play the loaded track
    currentTrack.play();
    isPlaying = true;
  }
   
  function pauseTrack() {
    // Pause the loaded track
    currentTrack.pause();
    isPlaying = false;
  }

fwdBtn.addEventListener('click', nextTrack);
function nextTrack(){
    //return to first track if on the last
  if (trackIndex < trackList.length - 1)
  trackIndex += 1;
    else trackIndex = 0;

    // Load and play the new track
    loadTrack(trackIndex);
    playTrack();
    trigger.checked = "checked";
};

bwdBtn.addEventListener('click', prevTrack);
function prevTrack(){
   //return to last track if on the first
  if (trackIndex > 0)
  trackIndex -= 1;
    else trackIndex = trackList.length;
 
    // Load and play the new track
    loadTrack(trackIndex);
    playTrack();
    trigger.checked = "checked";
};

// repeatBtn.addEventListener('click', repeatFunc);
// shuffleBtn.addEventListener('click', shuffleFunc);

function seekTo() {
    //calculate the relative position by percentage 
    seekto = currentTrack.duration * (seekSlider.value / 100);
   
    //set the current track position to the calculated seek position
    currentTrack.currentTime = seekto;
}

function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(currentTrack.duration)) {
      seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
      seekSlider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(currentTrack.currentTime / 60);
      let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(currentTrack.duration / 60);
      let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);
   
      // dd a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      currentTime.textContent = currentMinutes + ":" + currentSeconds;
      totalTime.textContent = durationMinutes + ":" + durationSeconds;
    }
}

//use range value to set volume height
var range = document.querySelector('#volume');
var volume = document.querySelector('.volume-output');
range.addEventListener('change', function(){
    currentTrack.volume = range.value / 100;
    volume.textContent = range.value;
    if(range.value == 0){
        document.querySelector('.mute').classList.add('unshow');
    } else{
        document.querySelector('.mute').classList.remove('unshow');
    }
});

// function outputTracks(){
//     const trackShow   = document.querySelector('.track-list');
//     var tracks = JSON.parse(trackList);
//    var output = "";

//    for(var i in tracks){
//        output +=`<ul>
//        <li>Artist:${tracks[i].artist}</li>
//        <li>Title:${tracks[i].name}</li>
//        <li>Album:${tracks[i].album}</li>
//        <li>Release Year:${tracks[i].year}</li>
//        </ul>
//        `;
//    }

//    trackShow.innerHTML = output;
// }
// outputTracks();