var googleBucket = "https://storage.googleapis.com/manydays-gallery/";
var thumbnailBucket = googleBucket + "thumbnail/";
var previewBucket = googleBucket + "preview/";
var rawBucket = googleBucket + "raw/";
var imagePrefix = ".png";

function InitialiseGallery()
{
    var numberOfImages = ImageCollection.Json["Images"].length;

    ManyDaysGallery.Promises = [];

    for(var i = numberOfImages - 1; i--; i > -1)
    {
        ManyDaysGallery.Promises.push(InitialiseImage(ImageCollection.Json["Images"][i]));
    }

    Promise.all(ManyDaysGallery.Promises).then(function() {
        Console.log("all promises done, yey!");
    });
}

function InitialiseImage(image)
{
    console.log(image.Id + ': ' + image.Name + ' ' + image.Location.Name + ' ' + image.Filename);

    return new Promise((resolve, reject) => {
        $('<img/>').attr('src', thumbnailBucket + image.Filename + imagePrefix)
        .on('load', function ()
        {
            $('#gallery').append('<div class="imgThumbnail" id="img_'+image.Id+'"></div>');
            $('#img_'+image.Id).css('background-image', 'url('+thumbnailBucket + image.Filename + imagePrefi+')');

            resolve();
        })
        .on('error', function (err)
        {
            console.log('Failed to get image, error: ' + err);
            resolve();
        });
    });
}
