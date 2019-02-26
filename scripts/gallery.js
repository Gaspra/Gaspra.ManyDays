var googleBucket = "https://storage.googleapis.com/manydays-gallery/";
var thumbnailBucket = googleBucket + "thumbnail/";
var previewBucket = googleBucket + "preview/";
var rawBucket = googleBucket + "raw/";
var imagePrefix = ".png";
var galleryPromiseBatchSize = 10;
var lastLoadedThumbnail;
var loadThumbnails = true;

function InitialiseGallery()
{
    ManyDaysGallery.Promises = [];
    lastLoadedThumbnail = ImageCollection.ImageCount - 1;

    for(var i = ImageCollection.ImageCount - 1; i--; i > -1)
    {
        $('#gallery').append('<div class="imgThumbnail imgHidden" id="img_'+ImageCollection.Json["Images"][i].Id+'"></div>');
    }

    navPause.on('click', function()
    {
        ToggleThumbnailLoading();
    });

    RecurseLoadThumbnails();

    ResizeThumbnails();
}

function RecurseLoadThumbnails()
{
    if(loadThumbnails)
    {
        Promise.all(LoadThumbnailsBatch()).then(function() {
            RecurseLoadThumbnails();
        });
    }

    if(lastLoadedThumbnail = 0)
    {
        navPause.css("display", "none");
    }
}

function ToggleThumbnailLoading()
{
    loadThumbnails = !loadThumbnails;
    if(loadThumbnails && lastLoadedThumbnail > -1)
    {
        RecurseLoadThumbnails();
    }
}

function LoadThumbnailBatch()
{
    return new Promise(function(resolve, reject)
    {
        var endOfBatch = lastLoadedThumbnail - galleryPromiseBatchSize;

        SetStatus("Loading batch: " + lastLoadedThumbnail + " - " + endOfBatch, 0);

        if(endOfBatch < 0)
        {
            endOfBatch = 0;
        }

        for(var i = lastLoadedThumbnail; i--; i > endOfBatch)
        {
            ManyDaysGallery.Promises.push(InitialiseImage(ImageCollection.Json["Images"][i]));
        }

        Promise.all(ManyDaysGallery.Promises).then(function()
        {
            lastLoadedThumbnail = endOfBatch;
            resolve();
        });
    });
}

function InitialiseImage(image)
{
    return new Promise((resolve, reject)
    {
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
                resolve(); //lol
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
