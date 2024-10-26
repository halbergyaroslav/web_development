const tracks = [
    {name: 'Enemy (Feat. JID)', 
        artist: 'Imagine Gragons', 
        audio: 'Assets/Audios/Imagine Dragons - Enemy (Feat. JID).mp3', 
        image: 'Assets/Images/Imagine Dragons - Enemy (Feat. JID).jpg',
        time: 173
    },
    {name: 'Industry Baby (feat. 22angels)', 
        artist: 'Meric Again', 
        audio: 'Assets/Audios/Meric Again - Industry Baby (feat. 22angels).mp3', 
        image: 'Assets/Images/Meric Again - Industry Baby (feat. 22angels).jpg',
        time: 136
    },
    {name: 'Balenciaga', 
        artist: 'T3NZU', 
        audio: 'Assets/Audios/T3NZU - Balenciaga.mp3', 
        image: 'Assets/Images/T3NZU - Balenciaga.jpg',
        time: 
    },
    {name: 'Can You Feel My Heart', 
        artist: 'Varien ft. Andrew Zink', 
        audio: 'Assets/Audios/Varien ft. Andrew Zink - Can You Feel My Heart.mp3', 
        image: 'Assets/Images/Varien ft. Andrew Zink - Can You Feel My Heart.jpg'
    }
];
  
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const trackCover = document.getElementById('track-cover');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackList = document.getElementById('track-list').children;
  
let currentIndex = 0;

let timer = 0;
window.setInterval(function () {
  doughnut = doughnut + 1;
  document.getElementById("doughnuts").innerHTML = "You have " + doughnut + " doughnuts!";
}, 1000);
  
function playTrack(index) {
    //Выбираем трек
    const track = tracks[index];

    // Добавляем кастомные элементы в аудио плэйр
    audioPlayer.src = track.audio;
    trackCover.src = track.image;
    trackTitle.textContent = track.name;
    trackArtist.textContent = track.artist;

    //Запускаем трек
    audioPlayer.play();
    playPauseButton.textContent = 'Pause';
}
  
playPauseButton.addEventListener('click', () => {
    //Пауза -> проигрование
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = 'Pause';
    } 
    //Проигрование -> Пауза
    else {
        audioPlayer.pause();
        playPauseButton.textContent = 'Play';
    }
});
  
nextButton.addEventListener('click', () => {
    //Переходим к следующему треку
    currentIndex = (currentIndex + 1) % tracks.length;
    playTrack(currentIndex);
});
  
prevButton.addEventListener('click', () => {
    //Переходим к предыдущему треку
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentIndex);
});
  
Array.from(trackList).forEach((trackItem, index) => {
    //По клику включаем музыку
    trackItem.addEventListener('click', () => {
        currentIndex = index;
        playTrack(currentIndex);
    });
});
  