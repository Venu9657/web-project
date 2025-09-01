const playPauseButton = document.getElementById('play-pause');
const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumArt = document.getElementById('album-art');
const seekBar = document.getElementById('seek-bar');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const volumeToggle = document.getElementById('volume-toggle');
const volumeSlider = document.getElementById('volume');
const volumeBtn = document.getElementById('volume-toggle');

const songs = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://via.placeholder.com/200x200.png?text=Blinding+Lights"
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://via.placeholder.com/200x200.png?text=Shape+of+You"
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://via.placeholder.com/200x200.png?text=Levitating"
    }
];

let currentSongIndex = 0;

function loadSong(song) {
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumArt.src = song.cover;
    audio.load();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸️';  // Change icon to pause
    } else {
        audio.pause();
        playPauseButton.textContent = '▶️';  // Change icon to play
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
}

function updateSeekBar() {
    const seekPosition = (audio.currentTime / audio.duration) * 100;
    seekBar.value = seekPosition;
}

function changeVolume() {
    audio.volume = volumeSlider.value;
}

function toggleMute() {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = volumeSlider.value;
    }
}

// Event Listeners
playPauseButton.addEventListener('click', playPause);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
seekBar.addEventListener('input', () => {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
});
audio.addEventListener('timeupdate', updateSeekBar);
volumeSlider.addEventListener('input', changeVolume);
volumeBtn.addEventListener('click', toggleMute);

// Initialize with first song
loadSong(songs[currentSongIndex]);
