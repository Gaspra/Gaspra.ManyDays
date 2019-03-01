var ManyDaysGallery = {};
var ImageCollection = {};

$(document).ready(function()
{
    InitialiseContainers();
    SetStatus('Loading metadata', 0);

    ConstructImageCollectionPromise();
    ConstructMapPromise();
    CheckUri();

    Promise.all([mapPromise, imageCollectionPromise]).then(function()
    {
        SetStatus('Initialising map and gallery', 0);

        InitialiseMap(ImageCollection.Json["Images"][ImageCollection.ImageCount - 1]);

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
    var uri = window.location.pathname;
    if(uri != "" && uri.includes('?'))
    {
        var query = uri.split('?')[uri.split('?').length - 1];
        var imageIds = query.split(',');
        ImageCollection.UriImages = imageIds;
    }
}

function SetStatus(status, clearTime)
{
    navStatus.html(status);

    if(clearTime != 0)
    {
        setTimeout(function(){ navStatus.html(""); }, clearTime * 1000);
    }
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
