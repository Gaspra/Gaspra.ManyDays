var ManyDaysGallery = {};
var ImageCollection = {};

$(document).ready(function()
{
    InitialiseContainers();
    SetStatus('Loading metadata', 0);

    ConstructImageCollectionPromise();
    ConstructMapPromise();

    Promise.all([mapPromise, imageCollectionPromise]).then(function()
    {
        SetStatus('Initialising map and gallery', 0);

        InitialiseMap();

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

function SetStatus(status, clearTime)
{
    navStatus.html("<fontSmall>"+status+"</fontSmall>");

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
