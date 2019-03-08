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
    navPause.on('click', function()
    {
        ToggleThumbnailsLoading();
    });

    if(ImageCollection.UriImages.length > 0)
    {
        LoadSpecificThumbnails(ImageCollection.UriImages);
    }
    else
    {
        ToggleThumbnailsLoading();
    }
}

function ToggleThumbnailsLoading()
{
    loadThumbnails = !loadThumbnails;

    if(loadThumbnails)
    {
        navPause.text("Loading");
        RecurseLoadThumbnails();
    }
    else
    {
        navPause.text("Paused");
    }
}

function RecurseLoadThumbnails()
{
    if(loadThumbnails)
    {
        if(ManyDaysGallery.Loaded.length + ManyDaysGallery.Rejected.length != ImageCollection.ImageCount)
        {
            LoadThumbnailsBatch().then(function() {
                RecurseLoadThumbnails();
            });
        }
        else
        {
            SetStatus("Finished loading [" + ManyDaysGallery.Loaded.length + "] thumbnails");
            console.log("Couldn't load: [" + ManyDaysGallery.Rejected.length + "] thumbnails");
            navPause.css("display", "none");
            loadThumbnails = false;
        }
    }
}

function LoadThumbnailsBatch()
{
    return new Promise(function(resolve, reject)
    {
        var loading = 0;
        statusIds = "";
        ImageCollection.Json["Images"].slice().reverse().forEach(function(image) {
            if(!ManyDaysGallery.Loaded.includes(image.Id) &&
                !ManyDaysGallery.Rejected.includes(image.Id))
            {
                if(loading < galleryPromiseBatchSize)
                {
                    ManyDaysGallery.Promises.push(InitialiseImage(image));
                    statusIds += image.Id + " ";
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
            SetStatus("Loading images with IDs: " + statusIds.replace(" ", ", "));
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

function LoadSpecificThumbnails(imageIds) //cleanup
{
    return new Promise(function(resolve, reject)
    {
        statusIds = "";
        imageIds.forEach(function(id)
        {
            if(!ManyDaysGallery.Loaded.includes(id) &&
                !ManyDaysGallery.Rejected.includes(id))
            {
                var imageToLoad = null;
                ImageCollection.Json["Images"].forEach(function(image) {
                    if(image.Id == id)
                    {
                        imageToLoad = image;
                        statusIds += image.Id + " ";
                    }
                });
                if(imageToLoad != null)
                {
                    ManyDaysGallery.Promises.push(InitialiseImage(imageToLoad));
                    SetMapLocation(imageToLoad);
                }
            }
        });

        if(ManyDaysGallery.Promises.length > 0)
        {
            SetStatus("Loading images with IDs: " + statusIds.replace(" ", ", "));
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
        SetMapLocation(image);
    });
}

function PreviewImage(image)
{
    SetStatus("Loading "+image.Name +" from: "+ image.Location.Name +" with ID: ["+image.Id+"]");
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
    var previewHtml = "<div class=\"fontDefault\"><b>[" + image.Id + "] " + image.Name + "</b></div><div class=\"fontSmall\" style=\"line-height:3vh;\">" + image.Location.Name + " (" + image.Location.Lat + ", " + image.Location.Lng + ")</div>";
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
