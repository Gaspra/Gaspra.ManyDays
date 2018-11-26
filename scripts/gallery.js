var googleBucket = "https://storage.googleapis.com/manydays-gallery/";
var thumbnailBucket = googleBucket + "thumbnail/";
var previewBucket = googleBucket + "preview/";
var rawBucket = googleBucket + "raw/";
var imagePrefix = ".png";

function InitialiseGallery()
{
    var numberOfImages = ImageCollection.Json["Images"].length;

    ManyDaysGallery.Promises = [];

    SetMapLocation(ImageCollection.Json["Images"][numberOfImages - 1]);

    for(var i = numberOfImages - 1; i--; i > -1)
    {
        $('#gallery').append('<div class="imgThumbnail imgHidden" id="img_'+ImageCollection.Json["Images"][i].Id+'"></div>');
        ManyDaysGallery.Promises.push(InitialiseImage(ImageCollection.Json["Images"][i]));        
    }

    ResizeThumbnails();

    Promise.all(ManyDaysGallery.Promises).then(function() {
        console.log("That's all of 'em!");
    });
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
            AddMapMarker(image);
            CreateClickEvent(image);
            resolve();
        })
        .on('error', function (err)
        {
            console.log('Failed to get image, error: ' + err);
            resolve();
        });
    });
}

function CreateClickEvent(image)
{
    $('#img_'+image.Id).on('click', function()
    {
        window.open(rawBucket + image.Filename + imagePrefix, '_blank');
    });
}
