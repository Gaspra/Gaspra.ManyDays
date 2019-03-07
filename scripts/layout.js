var manydaysContainer;
var aboutContainer;
var settingsContainer;
var previewContainer;
var previewBackground;
var previewTitleContainer;
var previewTitle;
var previewClose;
var resizeContainer;
var navContainer;
var navPause;
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
    previewBackground.css("background-color", "rgba(0,0,0,0.6)");
    previewBackground.on('click', function() {
        previewContainer.css("display", "none");
    });
    previewImage = $("#previewImage");
    previewImage.css("height", "80vh");
    previewImage.css("position", "absolute");
    previewImage.css("width", "80vw");
    previewImage.css("top", "10vh");
    previewImage.css("left", "10vw");
    previewTitleContainer = $("#previewTitleContainer");
    previewTitleContainer.css("height", "8vh");
    previewTitleContainer.css("width", "80vw");
    previewTitleContainer.css("top", "1vh");
    previewTitleContainer.css("left", "10vw");
    previewTitleContainer.css("position", "absolute");
    previewTitle = $("#previewTitle");
    previewTitle.css("height", "100%");
    previewTitle.css("width", "fit-content");
    previewTitle.css("padding", "0 10px");
    previewTitle.css("border-radius", "3px");
    previewTitle.css("background-color", "rgba(255,255,255,0.9)")
    previewTitle.css("position", "relative");
    previewTitle.css("text-align", "center");
    previewTitle.css("line-height", "5vh");
    previewTitle.css("margin", "auto");
    previewClose = $("#previewClose");
    previewClose.css("position", "asbolute");
    previewClose.css("top", "0");
    previewClose.css("right", "0");
    previewClose.css("width", "50px");
    previewClose.css("height", "50px");
    previewClose.css("cursor", "pointer");
    previewClose.css("background-color", "rgba(100,10,10,0.5)");
    previewClose.on('click', function() {
        previewContainer.css("display", "none");
    });

    navContainer = $("#nav");
    navContainer.css("height", "50px");
    navContainer.css("width", "100%");
    navContainer.css("background-color", "#ffffff");
    navContainer.css("position", "relative");
    navPause = $("#navPause");
    navPause.css("height", "40px");
    navPause.css("width", "fit-content");
    navPause.css("padding", "0 6px");
    navPause.css("margin", "4px");
    navPause.css("line-height", "40px");
    navPause.css("position", "relative");
    navPause.css("float", "right");
    navPause.css("border-radius", "3px");
    navPause.css("border", "2px solid rgb(0,0,0)");
    navPause.css("cursor", "pointer");
    navPause.css("z-index", "2");
    navStatus = $("#navStatus");
    navStatus.css("height", "50px");
    navStatus.css("width", "100%");
    navStatus.css("line-height", "50px");
    navStatus.css("position", "absolute");
    navStatus.css("margin", "0");
    navStatus.css("text-align", "center");
    navStatus.css("color", "rgba(30,30,30,0.9) !important");
    navStatus.css("z-index", "1");

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
