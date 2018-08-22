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
    manydaysContainer = $("#manydays");

    aboutContainer = $("#about");
    aboutContainer.height("100%");
    aboutContainer.width("100%");
    aboutContainer.css("background-color", "coral");

    settingsContainer = $("#settings");

    previewContainer = $("#preview");
    
    resizeContainer = $("#resize");
    
    mapContainer = $("#map");
    
    galleryContainer = $("#gallery");
}

$(window).resize(function()
{

});

