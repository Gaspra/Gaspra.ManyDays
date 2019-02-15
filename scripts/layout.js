var manydaysContainer;
var aboutContainer;
var settingsContainer;
var previewContainer;
var previewBackground;
var previewOpen;
var previewClose;
var resizeContainer;
var navContainer;
var pullContainer;
var mapContainer;
var galleryContainer;
var imageThumbnail;
var thumbnailCountPerRow = 6;

function InitialiseContainers()
{
    var body = $("body");
    body.css("height", "100vh");
    body.css("width", "100vw");
    body.css("padding", "0");
    body.css("border", "0");
    body.css("margin", "0");
    body.css("overflow", "hidden");

    manydaysContainer = $("#manydays");
    manydaysContainer.css("position", "absolute");

    aboutContainer = $("#about");
    aboutContainer.css("height", "100%");
    aboutContainer.css("width", "100%");
    aboutContainer.css("background-color", "#ffffff");
    aboutContainer.css("position", "absolute");

    settingsContainer = $("#settings");
    settingsContainer.css("display", "none");

    previewContainer = $("#preview");
    previewContainer.css("height", "100%");
    previewContainer.css("width", "100%");
    previewContainer.css("top", "0");
    previewContainer.css("left", "0");
    previewContainer.css("position", "absolute");
    previewContainer.css("display", "none");
    previewBackground = $("#previewBackground");
    previewBackground.css("height", "100%");
    previewBackground.css("width", "100%");
    previewBackground.css("background-color", "rgba(255,255,255,0.6)");
    previewImage = $("#previewImage");
    previewImage.css("height", "80vh");
    previewImage.css("width", "80vw");
    previewImage.css("position", "absolute");
    previewImage.css("top", "10vh");
    previewImage.css("left", "10vw");
    PreviewSetup();

    navContainer = $("#nav");
    navContainer.css("height", "50px");
    navContainer.css("width", "100%");
    navContainer.css("background-color", "#ffffff");
    navContainer.css("position", "relative");

    resizeContainer = $("#resize");
    resizeContainer.css("height", "20px");
    resizeContainer.css("width", "100%");
    resizeContainer.css("background-color", "#ffffff");
    resizeContainer.css("position", "relative");

    mapContainer = $("#map");
    mapContainer.css("width", "100%");
    mapContainer.css("height", "calc(40% - 70px)");
    mapContainer.css("position", "relative");

    galleryContainer = $("#gallery");
    galleryContainer.css("width", "100%");
    galleryContainer.css("height", "60%");
    galleryContainer.css("position", "relative");
    galleryContainer.css("overflow-y", "scroll");
}

function ResizeThumbnails()
{
    var thumbnailSize = (galleryContainer.width() / thumbnailCountPerRow);
    $(".imgThumbnail").css("width", thumbnailSize + "px");
    $(".imgThumbnail").css("height", thumbnailSize + "px");
}

function ResizeContainers()
{
    ResizeThumbnails();
}

function PreviewSetup()
{
    previewBackground.on('click', function() {
        previewContainer.css("display", "none");
    });
}

function PreviewImage(image)
{
    var loadPreviewPromise = LoadPreview(image);
    loadPreviewPromise.then(function() {
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
