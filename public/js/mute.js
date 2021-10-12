var btnaudio = document.querySelector(".btn-audio");

function toggleMute() {
    var sound = document.getElementById('sound');
    sound.muted = !sound.muted;
    if(sound.muted) {
        btnaudio.innerHTML = "UNMUTE SONG"
    } else {
        btnaudio.innerHTML = "MUTE SONG"
    }
}