var ManyDaysGallery = {};
var ImageCollection = {};

$(document).ready(function()
{
    InitialiseContainers();
    SetStatus('Loading metadata');

    ConstructImageCollectionPromise();
    ConstructMapPromise();
    CheckUri();

    Promise.all([mapPromise, imageCollectionPromise]).then(function()
    {
        SetStatus('Initialising map and gallery');

        InitialiseMap(ImageCollection.Json["Images"][ImageCollection.ImageCount - 1]);
        InitialisePreviewMap();

        InitialiseGallery();
    }), function() {
        //something went boom
        //recursively try again?.. todo
    };

});

$(window).resize(function()
{
    ResizeContainers();
});

function CheckUri()
{
    ImageCollection.UriImages = [];
    var uri = window.location.search;
    if(uri != "" && uri.includes('?i='))
    {
        var query = uri.split('?i=')[uri.split('?i=').length - 1];
        var imageIds = query.split(',');
        ImageCollection.UriImages = imageIds;
    }
}

function SetStatus(status)
{
    navStatus.html(status);

    setTimeout(function(){ navStatus.html(""); }, 4000);
}

var imageCollectionPromise;
function ConstructImageCollectionPromise()
{
    imageCollectionPromise = new Promise(function(resolve, reject)
    {
        $.get('../ManyDays.json')
            .done(function(data)
            {
                ImageCollection.Json = data;
                ImageCollection.ImageCount = data["Images"].length;
                resolve();
            })
            .fail(function() {
                reject();
            });
    });
}
