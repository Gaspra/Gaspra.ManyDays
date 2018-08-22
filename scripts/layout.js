var manydaysContainer;
var aboutContainer;
var settingsContainer;
var previewContainer;
var resizeContainer;
var mapContainer;
var galleryContainer;

$(document).ready(function() 
{
    InitialiseContainers();
});

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
    aboutContainer.height("100%");
    aboutContainer.width("100%");
    aboutContainer.css("background-color", "coral");
    aboutContainer.css("position", "absolute");

    settingsContainer = $("#settings");
    settingsContainer.css("display", "none");

    previewContainer = $("#preview");
    previewContainer.css("display", "none");

    resizeContainer = $("#resize");
    resizeContainer.css("display", "none");

    mapContainer = $("#map");
    mapContainer.css("display", "none");

    galleryContainer = $("#gallery");
    galleryContainer.css("display", "none");
}

$(window).resize(function()
{

});

