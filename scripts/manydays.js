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

        SetStatus('Loading completed', 5);

    }), function() {
        //something went boom
    };

});

$(window).resize(function()
{
    ResizeContainers();
});

function SetStatus(status, clearTime)
{
    navStatus.text(status);

    if(clearTime != 0)
    {
        setTimeout(function(){ navStatus.text(""); }, clearTime * 1000);
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
                resolve();
            })
            .fail(function() {
                reject();
            });
    });
}
