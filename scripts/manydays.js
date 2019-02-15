var ManyDaysGallery = {};
var ImageCollection = {};

$(document).ready(function()
{
    ConstructImageCollectionPromise();
    ConstructMapPromise();

    Promise.all([mapPromise, imageCollectionPromise]).then(function()
    {
        InitialiseMap();
        InitialiseContainers();
        InitialiseGallery();

    }), function() {
        //something went boom
    };

});

$(window).resize(function()
{
    ResizeContainers();
});


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
