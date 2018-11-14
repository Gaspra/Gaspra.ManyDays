var manydaysContainer;
var aboutContainer;
var settingsContainer;
var previewContainer;
var resizeContainer;
var mapContainer;
var galleryContainer;
var imageThumbnail;

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
    aboutContainer.css("background-color", "coral");
    aboutContainer.css("position", "absolute");

    settingsContainer = $("#settings");
    settingsContainer.css("display", "none");

    previewContainer = $("#preview");
    previewContainer.css("display", "none");

    resizeContainer = $("#resize");
    resizeContainer.css("display", "none");

    mapContainer = $("#map");
    mapContainer.css("width", "100%");
    mapContainer.css("height", "50%");
    mapContainer.css("position", "relative");

    galleryContainer = $("#gallery");
    galleryContainer.css("width", "100%");
    galleryContainer.css("height", "50%");
    galleryContainer.css("position", "relative");
    galleryContainer.css("background-color", "aqua");
    galleryContainer.css("overflow-y", "scroll");

    imageThumbnail = $(".imgThumbnail");
    imageThumbnail.css("width", (galleryContainer.innerWidth()/6 - galleryContainer.innerWidth()/6%1)
}

function ResizeContainers()
{

}
