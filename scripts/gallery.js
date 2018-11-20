var googleBucket = "https://storage.googleapis.com/manydays-gallery/";
var thumbnailBucket = googleBucket + "thumbnail/";
var previewBucket = googleBucket + "preview/";
var rawBucket = googleBucket + "raw/";
var imagePrefix = ".png";

function InitialiseGallery()
{
    var numberOfImages = ImageCollection.Json["Images"].length;

    CreateImageDivs(numberOfImages);

    ManyDaysGallery.Promises = [];
    for(var i = numberOfImages - 1; i--; i > -1)
    {
        ManyDaysGallery.Promises.push(InitialiseImage(ImageCollection.Json["Images"][i]));
    }

    Promise.all(ManyDaysGallery.Promises).then(function() {
        console.log("all promises done, yey!");
    });
}

function CreateImageDivs(numberOfImages)
{
    for(var i = numberOfImages - 1; i--; i > -1)
    {
        var imageId = ImageCollection.Json["Images"][i].Id;
        $('#gallery').append('<div class="imgThumbnail imgHidden" id="img_'+image.Id+'"></div>');
        ResizeThumbnails();
    }
}

function InitialiseImage(image)
{
    console.log(image.Id + ': ' + image.Name + ' ' + image.Location.Name + ' ' + image.Filename);

    return new Promise((resolve, reject) => {
        $('<img/>').attr('src', thumbnailBucket + image.Filename + imagePrefix)
        .on('load', function ()
        {
            $('#img_'+image.Id).css('background-image', 'url('+ thumbnailBucket + image.Filename + imagePrefix +')');
            $('#img_'+image.Id).removeClass('imgHidden');
            resolve();
        })
        .on('error', function (err)
        {
            console.log('Failed to get image, error: ' + err);
            reject();
        });
    });
}
