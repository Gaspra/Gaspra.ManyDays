var manydaysContainer;
var aboutContainer;
var preview;
var previewBackground;
var previewContainer;
var previewTitleBar;
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

    preview = $("#preview");
    preview.css("z-index", "10");
    preview.css("height", "100vh");
    preview.css("width", "100vw");
    preview.css("top", "0");
    preview.css("left", "0");
    preview.css("position", "absolute");
    preview.css("display", "none");
    previewBackground = $("#previewBackground");
    previewBackground.css("height", "100vh");
    previewBackground.css("width", "100vw");
    previewBackground.css("background-color", "rgba(0,0,0,0.6)");
    previewBackground.on('click', function() {
        preview.css("display", "none");
    });
    previewContainer = $("#previewContainer");
    previewContainer.css("position", "absolute");
    previewContainer.css("height", "100vh");
    previewContainer.css("top", "0");
    previewContainer.css("width", "90vw");
    previewContainer.css("left", "5vw");
    previewContainer.css("background-color", "rgba(0,0,0,0.4)");
    previewImage = $("#previewImage");
    previewImage.css("position", "relative");
    previewImage.css("height", "80%");
    previewImage.css("width", "100%");
    previewTitleBar = $("#previewTitleBar");
    previewTitleBar.css("position", "relative");
    previewTitleBar.css("height", "10%");
    previewTitleBar.css("width", "100%");
    previewTitle = $("#previewTitle");
    previewTitle.css("height", "86%");
    previewTitle.css("width", "fit-content");
    previewTitle.css("padding", "2%");
    previewTitle.css("background-color", "rgba(255,255,255,0.9)")
    previewTitle.css("position", "relative");
    previewTitle.css("text-align", "center");
    previewTitle.css("margin", "1vh auto");
    previewTitle.css("border-bottom-left-radius", "5px");
    previewTitle.css("border-bottom-right-radius", "5px");
    previewClose = $("#previewClose");
    previewClose.css("position", "absolute");
    previewClose.css("top", "9px");
    previewClose.css("right", "9px");
    previewClose.css("width", "50px");
    previewClose.css("height", "50px");
    previewClose.css("border-radius", "30px");
    previewClose.css("border")
    previewClose.css("line-height", "42px");
    previewClose.css("text-align", "center");
    previewClose.css("font-size", "28px");
    previewClose.css("font-family", "tahoma");
    previewClose.css("cursor", "pointer");
    previewClose.css("background-color", "rgb(255,255,255)");
    previewClose.css("color", "rgba(30,30,30,0.9)");
    previewClose.css("border", "rgba(30,30,30,0.9) solid 3px");
    previewClose.on('click', function() {
        preview.css("display", "none");
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
