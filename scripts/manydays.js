$(document).ready(function()
{
    InitialiseContainers();

    InitialiseMap();

    LoadImageCollection();
});

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
