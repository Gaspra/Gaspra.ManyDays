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
    var promise = $.get('../manydays.json');
    promise.done(function (data) {
        ImageCollection.Json = data;
        
        InitialiseGallery();
    });
}
