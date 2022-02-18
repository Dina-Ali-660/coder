const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration'); 
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music 

const songs = [
    {
        name:'1',
        displayName : 'hadal Ahbek'
    },
    {
        name:'2',
        displayName : 'Le3btek'
    },
    {
        name:'3',
        displayName : 'Etnaset'
    },
    {
        name:'4',
        displayName : 'Wein'
    },
    {
        name:'5',
        displayName : 'kel el 3alam'
    },
    {
        name:'6',
        displayName : '3ala 3eeni'
    },
    {
        name:'7',
        displayName : 'Ally Al Wadaa'
    },
    {
        name:'8',
        displayName : 'لا تتوقع'
    },
    {
        name:'9',
        displayName : 'Bedi E7kik'
    },
    {
        name:'10',
        displayName : 'Inta El Haz'
    }
];
let isPlaying = false;

// Play

const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


// play or pause Event Listeners 

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM

const loadSong = (song) => {
    title.textContent = song.displayName;
    music.src = `${song.name}.mp3`;
    image.src = `${song.name}.jpg`;
    
}

// currentSong 

let songIndex = 0;

// Previous song

const prevSong = () => {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song

const nextSong = () => {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song

// Update progress bar & time

const updateProgressBar = (e) => {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update prog Bar Width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set Progress Bar 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const{duration} = music;
    music.currentTime = (clickX / width) * duration;
}
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);

