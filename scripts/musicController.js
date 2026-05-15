const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");

const playback = document.getElementById("playback");
const volume = document.getElementById("volume");

const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");
const volumeText = document.getElementById("volumeText");

let needRepeat = false;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

audio.addEventListener("loadedmetadata", () => {
    playback.max = Math.floor(audio.duration);
    durationText.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", () => {
    playIcon.src = IconsPlay;
    if (needRepeat) {
        audio.play();
        playIcon.src = IconsPause;
    }
})

audio.addEventListener("timeupdate", () => {
    playback.value = Math.floor(audio.currentTime);
    currentTimeText.textContent = formatTime(audio.currentTime);
});

playBtn.addEventListener("click", (e) => {
    e.preventDefault();
    runTrack();
});

function runTrack() {
    updateVolume();
    if (audio.paused) {
        audio.play();
        playIcon.src = IconsPause;
    } else {
        audio.pause();
        playIcon.src = IconsPlay;
    }
}

playback.addEventListener("input", () => {
    audio.currentTime = playback.value;
});

volume.addEventListener("input", () => {
    updateVolume();
});

function updateVolume() {
    saveData.volume = volume.value;
    audio.volume = saveData.volume / 100;
    volumeText.textContent = volume.value + "%";
}

async function loadTrack(trackId, providerId) {
    audio.src = URL.createObjectURL((await fetchFromProvider(MBDownload + trackId, true, providerId))[0]);
    playIcon.src = IconsPlay;
    runTrack();
}

audio.volume = 1;