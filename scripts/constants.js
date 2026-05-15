// Constant Values
// noinspection JSUnusedGlobalSymbols

const placeholderImageURL = "https://developer.valvesoftware.com/w/images/8/8b/Debugempty.png";

const IconsBaseFolder = "resources/icons";
const IconsAgeRestricted = `${IconsBaseFolder}/age-restricted.svg`;
const IconsArtistSearch = `${IconsBaseFolder}/artist-search.svg`;
const IconsBackward = `${IconsBaseFolder}/backward.svg`;
const IconsDownload = `${IconsBaseFolder}/download.svg`;
const IconsForward = `${IconsBaseFolder}/forward.svg`;
const IconsLyricsLrc = `${IconsBaseFolder}/lyrics-lrc.svg`;
const IconsLyricsText = `${IconsBaseFolder}/lyrics-text.svg`;
const IconsMusicAlbum = `${IconsBaseFolder}/music-album.svg`;
const IconsOpenLink = `${IconsBaseFolder}/open-link.svg`;
const IconsPause = `${IconsBaseFolder}/pause.svg`;
const IconsPlay = `${IconsBaseFolder}/play.svg`;
const IconsRepeat = `${IconsBaseFolder}/repeat.svg`;
const IconsSetting = `${IconsBaseFolder}/settings.svg`;
const IconsVolumeMin = `${IconsBaseFolder}/volume-max.svg`;
const IconsVolumeMax = `${IconsBaseFolder}/volume-min.svg`;
const IconsVolumeOff = `${IconsBaseFolder}/volume-off.svg`;

// Objects Patterns

const TrackInfoIconAgeRestrictedPattern = `<img src='${IconsAgeRestricted}' alt="" title="Age restricted">`;
const TrackInfoIconLyricsTextPattern = `<img src='${IconsLyricsText}' alt="" title="Text lyrics available">`;
const TrackInfoIconLyricsLRCPattern = `<img src='${IconsLyricsLrc}' alt="" title="LRC lyrics available">`;

const searchTrackObjectPattern = `
        <li onclick="openTrackData('%ProviderId%', '%TrackId%')"
            style="background: linear-gradient(90deg, rgb(50, 50, 50) 25%, rgba(%ServiceColorR%, %ServiceColorG%, %ServiceColorB%, 0.5) 50%, rgb(50, 50, 50) 75%);"
            onmouseover="this.style.background='linear-gradient(90deg, rgb(40, 40, 40) 20%, rgba(%ServiceColorR%, %ServiceColorG%, %ServiceColorB%, 0.8) 50%, rgb(40, 40, 40) 80%)'; this.style.cursor = 'pointer';"
            onmouseout="this.style.background='linear-gradient(90deg, rgb(50, 50, 50) 25%, rgba(%ServiceColorR%, %ServiceColorG%, %ServiceColorB%, 0.5) 50%, rgb(50, 50, 50) 75%)'; this.style.cursor = 'default';">
            <div class="search-track-data" >
                <img src="%Logo%" alt="none"
                onmouseover="this.style.opacity = 0.4"
                onmouseout="this.style.opacity = 1.0">
                <img src='${IconsPlay}'
                 onclick="playTrack('%ProviderId%', '%TrackId%')"
                 style="margin-left: -55px; scale: 1; opacity: 0;"
                 onmouseover="this.style.opacity = 1.0; this.parentElement.childNodes[1].style.opacity = 0.4;"
                 onmouseout="this.style.opacity = 0.0; this.parentElement.childNodes[1].style.opacity = 1.0;"
                 alt="">
                <div class="text">
                    <h1>%Title%</h1>
                    <h3>%Artist% (%Album%)</h3>
                </div>
            </div>
            <div class="search-track-info">
                %TrackInfo%
            </div>
        </li>
    `;

// MB URLs
const MBBase = `/`
const MBVersion = `${MBBase}v1.0`

const MBAuth = `${MBVersion}/auth`
const MBSearch = `${MBVersion}/search/`
const MBLyricsLrc = `${MBVersion}/lyrics/lrc/`
const MBLyricsText = `${MBVersion}/lyrics/text/`
const MBDownload = `${MBVersion}/download/`

const MBSearchSpecTrack = `trackId:`
const MBSearchSpecAlbum = `albumId:`
const MBSearchSpecArtist = `artistId:`
const MBSearchSpecProvider = `providerId:`

// Save
const SavePrefab = {
    "providers": {},
    "auth": {},
    "volume": {}
}

// Objects
const searchTrackList = document.getElementById("search-list");

const currentTrackLogoObject = document.getElementById('current-track-logo');
const currentTrackTitleObject = document.getElementById('current-track-title');
const currentTrackArtistAlbumObject = document.getElementById('current-track-artist-album');

const busyList = document.getElementById('busy-provider')

const accountsList = document.getElementById('accounts');

