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

var ImageCollection = {};

function LoadImageCollection() 
{
    var promise = $.get('../gallery/manydays.json');
    promise.done(function (data) {
        ImageCollection.Json = data;
    });

    ImageCollection.Images = [];
}