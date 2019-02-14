$(document).ready(function()
{
    InitialiseContainers();

    InitialiseMap();


});

function MapLoaded()
{
    LoadImageCollection();
}

$(window).resize(function()
{
    ResizeContainers();
});

var ManyDaysGallery = {};
var ImageCollection = {};

function LoadImageCollection()
{
    var promise = $.get('../ManyDays.json');
    promise.done(function (data) {
        ImageCollection.Json = data;
        InitialiseGallery();
    });
}
