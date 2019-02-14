var ManyDaysGallery = {};
var ImageCollection = {};

$(document).ready(function()
{
    var promise = $.get('../ManyDays.json');
    promise.done(function (data) {
        ImageCollection.Json = data;

    });

    InitialiseContainers();

    InitialiseMap();
});

function MapLoaded()
{
    LoadImageCollection();

    InitialiseGallery();
}

$(window).resize(function()
{
    ResizeContainers();
});
