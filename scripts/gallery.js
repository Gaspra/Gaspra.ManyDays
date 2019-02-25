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
        $('#gallery').append('<div class="imgThumbnail imgHidden" id="img_'+ImageCollection.Json["Images"][i].Id+'"></div>');
        ManyDaysGallery.Promises.push(InitialiseImage(ImageCollection.Json["Images"][i]));
    }

    ResizeThumbnails();
}

function InitialiseImage(image)
{
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
        PreviewImage(image);
    });
}

function PreviewImage(image)
{
    SetStatus("Loading "+image.Name, 0)
    var loadPreviewPromise = LoadPreview(image);
    loadPreviewPromise.then(function() {
        SetStatus("", 0)
        previewTitle.text(image.Name + ": " + image.Id);
        previewContainer.css("display", "block");
        previewImage.off();
        previewImage.on('click',function() {
            window.open(rawBucket + image.Filename + imagePrefix, '_blank');
        });
    });
}

function LoadPreview(image)
{
    return new Promise((resolve, reject) => {
        $('<img/>').attr('src', previewBucket + image.Filename + imagePrefix)
        .on('load', function ()
        {
            previewImage.css('background-image', 'url('+ previewBucket + image.Filename + imagePrefix +')');
            resolve();
        })
        .on('error', function (err)
        {
            console.log('Failed to get image, error: ' + err);
            resolve();
        });
    });
}
