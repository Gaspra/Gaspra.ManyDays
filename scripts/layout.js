var manydaysContainer;
var aboutContainer;
var settingsContainer;
var previewContainer;
var previewBackground;
var previewTitle;
var previewOpen;
var previewClose;
var resizeContainer;
var navContainer;
var navStatus;
var pullContainer;
var mapContainer;
var galleryContainer;
var imageThumbnail;
var thumbnailCountPerRow = 6;

function InitialiseContainers()
{
    var body = $("body");
    body.css("height", "100vh");
    body.css("width", "100vw");
    body.css("padding", "0");
    body.css("border", "0");
    body.css("margin", "0");
    body.css("overflow", "hidden");

    manydaysContainer = $("#manydays");
    manydaysContainer.css("position", "absolute");

    aboutContainer = $("#about");
    aboutContainer.css("height", "100%");
    aboutContainer.css("width", "100%");
    aboutContainer.css("background-color", "#ffffff");
    aboutContainer.css("position", "absolute");

    settingsContainer = $("#settings");
    settingsContainer.css("display", "none");

    previewContainer = $("#preview");
    previewContainer.css("height", "100%");
    previewContainer.css("width", "100%");
    previewContainer.css("top", "0");
    previewContainer.css("left", "0");
    previewContainer.css("position", "absolute");
    previewContainer.css("display", "none");
    previewBackground = $("#previewBackground");
    previewBackground.css("height", "100%");
    previewBackground.css("width", "100%");
    previewBackground.css("background-color", "rgba(255,255,255,0.6)");
    previewBackground.on('click', function() {
        previewContainer.css("display", "none");
    });
    previewImage = $("#previewImage");
    previewImage.css("height", "80vh");
    previewImage.css("position", "absolute");
    previewImage.css("width", "80vw");
    previewImage.css("top", "10vh");
    previewTitle = $("#previewTitle");
    previewTitle.css("height", "8vh");
    previewTitle.css("width", "80vw");
    previewTitle.css("top", "2vh");
    previewTitle.css("border-radius", "3px 3px 0 0");
    previewTitle.css("background-color", "#ffffff")
    previewTitle.css("position", "absolute");
    previewTitle.css("text-align", "center");
    previewTitle.css("line-height", "8vh");

    navContainer = $("#nav");
    navContainer.css("height", "50px");
    navContainer.css("width", "100%");
    navContainer.css("background-color", "#ffffff");
    navContainer.css("position", "relative");
    navStatus = $("#navStatus");
    navStatus.css("height", "50px");
    navStatus.css("width", "fit-content");
    navStatus.css("line-height", "50px");
    navStatus.css("position", "relative");
    navStatus.css("margin", "auto auto");

    resizeContainer = $("#resize");
    resizeContainer.css("height", "20px");
    resizeContainer.css("width", "100%");
    resizeContainer.css("background-color", "#ffffff");
    resizeContainer.css("position", "relative");

    mapContainer = $("#map");
    mapContainer.css("width", "100%");
    mapContainer.css("height", "calc(40% - 70px)");
    mapContainer.css("position", "relative");

    galleryContainer = $("#gallery");
    galleryContainer.css("width", "100%");
    galleryContainer.css("height", "60%");
    galleryContainer.css("position", "relative");
    galleryContainer.css("overflow-y", "scroll");
}

function ResizeThumbnails()
{
    var thumbnailSize = (galleryContainer.width() / thumbnailCountPerRow);
    $(".imgThumbnail").css("width", thumbnailSize + "px");
    $(".imgThumbnail").css("height", thumbnailSize + "px");
}

function ResizeContainers()
{
    ResizeThumbnails();
}
