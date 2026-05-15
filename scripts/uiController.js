let longTasks = {}

function tasksWindow() {
    console.log(longTasks);
    let showWindow = false;

    busyList.innerHTML = '';
    for (let currentLongTask in longTasks) {
        if (longTasks[currentLongTask] > 0) {
            showWindow = true;
            busyList.innerHTML += `<li>${currentLongTask}</li>`
        }
    }
    document.getElementById("overlay").style.display = showWindow ? "" : "none";
}

function addTask(providerId) {
    longTasks[providerId] = longTasks[providerId] === undefined ? longTasks[providerId] = 1 : longTasks[providerId] + 1
    tasksWindow()
}

function removeTask(providerId) {
    longTasks[providerId] -= 1
    tasksWindow()
}

function makeTrackInfoIcons(isAgeRestricted, haveLyricsText, haveLyricsLRC) {
    let icons = "";

    icons += isAgeRestricted ? TrackInfoIconAgeRestrictedPattern : "";
    icons += haveLyricsText ? TrackInfoIconLyricsTextPattern : "";
    icons += haveLyricsLRC ? TrackInfoIconLyricsLRCPattern : "";

    return icons;
}

function makeSearchTrackObject(ServiceColorR, ServiceColorG, ServiceColorB, providerId, trackId, LogoURL, Title, Artist, Album, isAgeRestricted, haveLyricsText, haveLyricsLRC) {
    return searchTrackObjectPattern
        .replaceAll("%ServiceColorR%", ServiceColorR).replaceAll("%ServiceColorG%", ServiceColorG).replaceAll("%ServiceColorB%", ServiceColorB)
        .replaceAll("%ProviderId%", providerId).replaceAll("%TrackId%", trackId).replaceAll("%Logo%", LogoURL).replaceAll("%Title%", Title).replaceAll("%Artist%", Artist).replaceAll("%Album%", Album)
        .replaceAll("%TrackInfo%", makeTrackInfoIcons(isAgeRestricted, haveLyricsText, haveLyricsLRC));
}

function addSearchTrack(ServiceColorR, ServiceColorG, ServiceColorB, providerId, trackId, LogoURL, Title, Artist, Album, isAgeRestricted, haveLyricsText, haveLyricsLRC) {
    searchTrackList.innerHTML += makeSearchTrackObject(ServiceColorR, ServiceColorG, ServiceColorB, providerId, trackId, LogoURL, Title, Artist, Album, isAgeRestricted, haveLyricsText, haveLyricsLRC);
}

function clearSearchList() {
    searchTrackList.innerHTML = "";
}

function fitDataText(elements, minSize = 12, gap = 4) {
    const elems = Array.from(elements);
    const container = elems[0].parentElement;

    const baseSizes = elems.map(el => el.tagName === "H1" ? 56 : 20);
    elems.forEach((el, i) => el.style.fontSize = baseSizes[i] + "px");
    let totalHeight = elems.reduce((sum, el) => sum + el.scrollHeight, 0) + gap * (elems.length - 1);
    const scale = Math.min(1, container.clientHeight / totalHeight);

    elems.forEach((el, i) => {
        let newSize = Math.max(minSize, Math.floor(baseSizes[i] * scale));
        el.style.fontSize = newSize + "px";
    });
}