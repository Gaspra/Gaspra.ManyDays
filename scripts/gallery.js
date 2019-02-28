var googleBucket = "https://storage.googleapis.com/manydays-gallery/";
var thumbnailBucket = googleBucket + "thumbnail/";
var previewBucket = googleBucket + "preview/";
var rawBucket = googleBucket + "raw/";
var imagePrefix = ".png";
var galleryPromiseBatchSize = 10;
var loadThumbnails = false;

function InitialiseGallery()
{
    ManyDaysGallery.Promises = [];
    ManyDaysGallery.Loaded = [];
    ManyDaysGallery.Rejected = [];

    CreateDivContainers();
    InitialiseImageLoading();
}

function CreateDivContainers()
{
    for(var i = ImageCollection.ImageCount - 1; i > -1; i--)
    {
        $('#gallery').append('<div class="imgThumbnail imgHidden" id="img_'+ImageCollection.Json["Images"][i].Id+'"></div>');
    }

    ResizeThumbnails();
}

function InitialiseImageLoading()
{
    ToggleThumbnailsLoading();

    navPause.on('click', function()
    {
        ToggleThumbnailsLoading();
    });
}

function ToggleThumbnailsLoading()
{
    loadThumbnails = !loadThumbnails;

    if(loadThumbnails)
    {
        navPause.text("Loading");
        RecurseLoadThumbnails();
    }
    else if (!loadThumbnails)
    {
        navPause.text("Paused");
    }
}

function RecurseLoadThumbnails()
{
    if(ManyDaysGallery.Loaded.length + ManyDaysGallery.Rejected.length != ImageCollection.ImageCount)
    {
        LoadThumbnailsBatch().then(function() {
            RecurseLoadThumbnails();
        });
    }
    else
    {
        SetStatus("Finished loading [" + ManyDaysGallery.Loaded.length + "] thumbnails", 6);
        console.log("Couldn't load: [" + ManyDaysGallery.Rejected.length + "] thumbnails");
        navPause.css("display", "none");
        loadThumbnails = false;
    }
}

function LoadThumbnailsBatch()
{
    return new Promise(function(resolve, reject)
    {
        var loading = 0;
        ImageCollection.Json["Images"].slice().reverse().forEach(function(image) {
            if(!ManyDaysGallery.Loaded.includes(image.Id))
            {
                if(loading < galleryPromiseBatchSize)
                {
                    ManyDaysGallery.Promises.push(InitialiseImage(image));
                    loading++;
                }
                else if(loading >= galleryPromiseBatchSize)
                {
                    return;
                }
            }
        });

        if(ManyDaysGallery.Promises.length > 0)
        {
            Promise.all(ManyDaysGallery.Promises).then(function()
            {
                ManyDaysGallery.Promises = [];
                resolve();
            });
        }
        else
        {
            resolve();
        }
    });
}

function InitialiseImage(image)
{
    return new Promise(function(resolve, reject)
    {
        $('<img/>').attr('src', thumbnailBucket + image.Filename + imagePrefix)
            .on('load', function ()
            {
                $('#img_'+image.Id).css('background-image', 'url('+ thumbnailBucket + image.Filename + imagePrefix +')');
                $('#img_'+image.Id).removeClass('imgHidden');
                AddMapMarker(image);
                CreateClickEvent(image);
                LoadedImage(image.Id);
                resolve();
            })
            .on('error', function (err)
            {
                RejectImage(image.Id, err);
                //error handled, resolve anyway
                resolve();
            });
    });
}

function LoadedImage(imageId)
{
    ManyDaysGallery.Loaded.push(imageId);
}

function RejectImage(imageId, err)
{
    ManyDaysGallery.Rejected.push(imageId);
    console.log("Image rejected: "+imageId+ " with error: "+err);
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
    SetStatus("Loading "+image.Name, 5)
    var loadPreviewPromise = LoadPreview(image);
    loadPreviewPromise.then(function() {
        SetPreviewText(image);
        previewContainer.css("display", "block");
        previewImage.off();
        previewImage.on('click',function() {
            window.open(rawBucket + image.Filename + imagePrefix, '_blank');
        });
    });
}

function SetPreviewText(image)
{
    var previewHtml = "<b>[" + image.Id + "] " + image.Name + "</b></br><fontSmall>" + image.Location.Name + " (" + image.Location.Lat + ", " + image.Location.Lng + ")</fontSmall>";
    previewTitle.html(previewHtml);
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
