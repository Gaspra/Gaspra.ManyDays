var ManyDaysGallery = {};
var ImageCollection = {};

$(document).ready(function()
{
    var promise = $.get('../ManyDays.json');
    promise.done(function (data) {
        ImageCollection.Json = data;

        InitialiseMap();
    });

    InitialiseContainers();
});

function MapLoaded()
{
    InitialiseGallery();
}

$(window).resize(function()
{
    ResizeContainers();
});
