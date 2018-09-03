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
    var promise = $.get('../gallery/manydays.Json');
    promise.done(function (data) {
        ImageCollection.Json = JSON.parse(data);
    });

    ImageCollection.Images = [];
}