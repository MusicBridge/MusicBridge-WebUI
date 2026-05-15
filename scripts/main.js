// noinspection JSUnresolvedReference

async function search(text) {
    clearSearchList();

    const results = (await fetchFromProvider(MBSearch + text, false))[0];
    console.log(results)
    for (const result in results) {
        const data = results[result];
        const providerInfo = (await fetchFromProvider("", false, providers[result]))[0][result];
        for (let j = 0; j < data.length; j++) {
            const curr_data = data[j];
            addSearchTrack(providerInfo.color.r, providerInfo.color.g, providerInfo.color.b, providerInfo.provider_identifier,
                curr_data.id, curr_data.album.logo, curr_data.title, curr_data.artist.name, curr_data.album.name,
                curr_data.explicit, curr_data.lyrics.text, curr_data.lyrics.lrc
            )
        }
    }
}

async function displayData(providerId, trackId) {
    let providerInfo = (await fetchFromProvider("", false, providerId))[0];


    const foundedTrack = (await fetchFromProvider(MBSearch + MBSearchSpecTrack + trackId, false, providerId))[0][0];
    console.log(foundedTrack)

    document.getElementById("track-data-title").innerText = foundedTrack.title;
    document.getElementById("track-data-artist-album").innerText = `${foundedTrack.artist.name} (${foundedTrack.album.name})`;
    fitDataText(document.querySelectorAll(".data .text h1, .data .text h3"))
    document.getElementById("track-data-logo").src = foundedTrack.album.logo;
    document.getElementById("track-data-info").innerHTML = makeTrackInfoIcons(foundedTrack.explicit, foundedTrack.lyrics.text, foundedTrack.lyrics.lrc);
    document.getElementById("data").style.background = "linear-gradient(180deg, rgb(32, 32, 32) 80%, rgba(%R%, %G%, %B%, 0.5) 100%)"
        .replaceAll("%R%", providerInfo.color.r).replaceAll("%G%", providerInfo.color.g).replaceAll("%B%", providerInfo.color.b)

    document.getElementById("open-track-button").href = foundedTrack.url;
    document.getElementById("open-artist-button").href = foundedTrack.artist.url;
    document.getElementById("open-album-button").href = foundedTrack.album.url;

    document.getElementById("download-track-button").onclick = function () {
        downloadTrack(MBDownload + foundedTrack.id, foundedTrack.artist.name + ' - ' + foundedTrack.title + '.mp3', providerId)
    };

    document.getElementById("search-artist-button").onclick = async function () {
        document.getElementById("search").value = `${MBSearchSpecArtist}${foundedTrack.artist.id}`;
        clearSearchList();
        await search(`${MBSearchSpecArtist}${foundedTrack.artist.id}`)
    };
    document.getElementById("search-album-button").onclick = async function () {
        document.getElementById("search").value = `${MBSearchSpecAlbum}${foundedTrack.album.id}`;
        clearSearchList();
        await search(`${MBSearchSpecAlbum}${foundedTrack.album.id}`)
    };

}

async function downloadTrack(url, fileName, providerId) {
    const response = await fetchFromProvider(url, true, providerId)

    const downloadUrl = window.URL.createObjectURL(response[0]);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

}

async function openTrackData(providerId, trackId) {
    await displayData(providerId, trackId);
}

async function playTrack(providerId, trackId) {
    console.log(`Playing: ${providerId}/${trackId}`);

    const foundedTrack = (await fetchFromProvider(MBSearch + MBSearchSpecTrack + trackId, false, providerId))[0][0];

    currentTrackLogoObject.src = foundedTrack.album.logo;
    currentTrackTitleObject.innerText = foundedTrack.title;
    currentTrackArtistAlbumObject.innerText = foundedTrack.artist.name + "(" + foundedTrack.album.name + ")";
    await loadTrack(trackId, providerId)

    fitDataText(document.querySelectorAll("footer .current-track-logo-container .text h1, footer .current-track-logo-container .text h3"), 12, 225)
}

document.addEventListener("DOMContentLoaded", async () => {
    await init()
    volume.value = saveData.volume;
    updateVolume();

    await loadProviders()

    document.getElementById("search-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const query = document.getElementById("search").value;
        if (!query) return;

        await search(query);
    })
})