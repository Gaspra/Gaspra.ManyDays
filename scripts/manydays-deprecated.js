/*todo: Main window start and resize*/
$(document).ready(function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAfos2R1YDjjBNgLkYDWltFPYNeh9x3eog&callback=initManyDays";
    $('#scripts').append(script);
});

siteLoaded = false;
//function initManyDays() {

    /*
    $('body').css('display', 'block');

    while (!siteLoaded) {

        

        initMap(-36.89, 174.65);
        loadingStatus(20);
        getManyDaysInformation();
        loadingStatus(30);
        initMoveBar();
        loadingStatus(40);
        initAboutContainer();
        loadingStatus(55);
        initElementSelection();
        loadingStatus(70);
        initElements();
        loadingStatus(85);
        resizePullBar();
        loadingStatus(95);
        resizeElementSize();

        if ($('#mdMap').height() > 50) {
            loadingStatus(100);
            siteLoaded = true;
        } 
    }
    */
//}

var amountLoaded = 0;
function loadingStatus(loaded) {
    if (loaded > amountLoaded) {
        $('#ManyDaysLoadingDescription').text('Loading: ' + loaded + '%');

        if (loaded === 100) {
            fadeAwayLoadingScreen();
        }

        amountLoaded = loaded;
    }
}

function fadeAwayLoadingScreen() {
    $('#ManyDaysLoadingDescription').fadeOut(800, function() {
        $('#ManyDaysLoadingLogo').css('height', 1000);
        $('#ManyDaysLoadingLogo').css('width', 1000);
        $('#ManyDaysLoadingLogo').css('right', '0');
        $('#ManyDaysLoadingLogo').css('float', 'right');

        $('#ManyDaysLoading').fadeOut(3000);
    });
}

$(window).resize(function() {
    resizePullBar();
    resizeImagesPerRow(ManyDays.ImagesPerRow);
});



/*todo: Gallery*/
var listOfElements = [];
var mdElement = function mdElement(id, name, type, lat, lng, location, content, tip) {
    this.Id = id;
    this.Name = name;
    this.Type = type;
    this.Lat = lat;
    this.Lng = lng;
    this.Location = location;
    this.Content = content;
    this.Tip = tip;
}

function initElementSelection() {
    $('#mdViewerClose').on('click', function () {
        $('#mdViewer').fadeOut(200, function easeInOutExpo() { });

        $('.ElementInfo').css('display', 'none');
        showOnMap(getElementWithId(currentElement));
        $('#Info' + currentElement).css('display', 'block');
    });

    $('#mdPrevViewer').on('click', function () {
        currentElement++;
        if (currentElement > highestId)
            currentElement = highestId;
        openElement();
    });

    $('#mdNextViewer').on('click', function () {
        currentElement--;
        if (currentElement < lowestId)
            currentElement = lowestId;
        openElement();
    });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: //left
                currentElement++;
                if (currentElement > highestId)
                    currentElement = highestId;
                openElement();
                break;

            case 39: //right
                currentElement--;
                if (currentElement < lowestId)
                    currentElement = lowestId;
                openElement();
                break;

            case 13: //enter
                $('#mdViewerOpen').trigger('click');
                break;

            case 27: //esc
                $('#mdViewerClose').trigger('click');
                break;

            default :
                return;
        }
        e.preventDefault();
    });

    $('#mdViewer').on('swipeleft', function() {
        currentElement--;
        if (currentElement < lowestId)
            currentElement = lowestId;
        openElement();
    });

    $('#mdViewer').on('swiperight', function() {
        currentElement++;
        if (currentElement > highestId)
            currentElement = highestId;
        openElement();
    });
}

var lowestId = Number.MAX_SAFE_INTEGER;
var highestId = 0;
var currentElement = 0;
function openElement() {
    var openingElement = getElementWithId(currentElement);

    cleanViewer();

    setViewerText(openingElement);

    if (openingElement.Type === "Image") {
        loadImageIntoViewer(openingElement);
    } else if (openingElement.Type === "Video") {
        loadVideoIntoViewer(openingElement);
    } else if (openingElement.Type === "Gif") {
        loadGifIntoViewer(openingElement);
    } else if (openingElement.Type === "Blog") {
        loadBlogIntoViewer(openingElement);
    }

    //todo: once loaded open viewer
    openViewer();
}

function getElementWithId(id) {
    for (var e = 0; e < listOfElements.length; e++) {
        if (listOfElements[e].Id === id) {
            return listOfElements[e];
        }
    }

    return null;
}

function cleanViewer() {
    $('#mdContent').html('');
    $('#mdViewerOpen').unbind();
    $('#mdViewerOpen').html('');
}

function openViewer() {
    if (!$('#mdViewer').is(":visible")) {
        $('#mdViewer').fadeIn(800, function easeInOutExpo() { });
    }
}

function setViewerText(element) {
    $('#mdViewerInfo').html(
        '<b>' + element.Name + '</b></br>' +
        '<small>' + element.Location + '</br>' +
        'Lat:' + element.Lat + '   Long:' + element.Lng + '</small></br></br>' +
        element.Tip
        );
}

function loadImageIntoViewer(filename) {
    $('#mdContent').html('<div id="mdContentImage"></div>');
    $('#mdContentImage').css('background-image', 'url(Content/Gallery/Image/' + filename + '.png)');

    $('#mdContentImage').ready(function() {
        $('#mdContentImage').fadeIn(100);
    });

    $('#mdContentImage').unbind();
    $('#mdContentImage').on('click', function() {
        window.open(window.location.protocol + '//' + window.location.host + '/Content/Gallery/Image/Raw/' + filename + ".png", '_blank');
    });

    $('#mdViewerOpen').on('click', function () {
        window.open(window.location.protocol + '//' + window.location.host + '/Content/Gallery/Image/Raw/' + filename + ".png", '_blank');
    });
}

function loadVideoIntoViewer(element) {
    $('#mdContent').html(
        '<iframe id="mdYoutube" src="https://www.youtube.com/embed/' + element.Content +
        '"></iframe>'
    );

    $('#mdViewerOpen').on('click', function () {
        window.open('https://www.youtube.com/watch?v=' + element.Content, '_blank');
    });
}

function loadGifIntoViewer(element) {
    
}

function loadBlogIntoViewer(element) {
    $('#mdViewerOpen').html('<div class="blankOutWhite"></div>');

    $.get('ManyDays/Blog?file=' + element.Content, function(data) {
        $('#mdContent').html('<div id="mdBlogContainer"><div id="mdBlog">' + data + '</div></div>');

        $('#mdBlogContainer').ready(function () {
            $('#mdBlogContainer').fadeIn(100);
        });
    });
}

function addElement(element) {
    listOfElements.push(element);

    if (element.Id < lowestId) {
        lowestId = element.Id;
    }

    if (element.Id > highestId) {
        highestId = element.Id;
    }

    appendElement(element);

    var latLng = { lat: element.Lat, lng: element.Lng };
    placeGenericMapMarker(latLng, element.Location, element.Id);

    $('.' + element.Id).on('click', function () {
        $('#Info' + currentElement).css('display', 'none');
        currentElement = element.Id;
        showOnMap(element);
        $('#Info' + element.Id).css('display', 'block');
    });

    $('#Info' + element.Id).on('click', function () {
        if (currentElement !== element.Id) {
            currentElement = element.Id;
        }
        openElement();
    });

    updateImageCount();
}

function appendElement(element) {
    $('#Elements').append(
        '<div class=\"ElementContainer onefiveTransitionBackground\">' +
            '<div class=\"Element ' + element.Id + '\">' +
                '<div id=\"Info' + element.Id + '\" class=\"ElementInfo\">' +
                    '<b>' + element.Name + '</b>' +
                    '<br/>' + element.Location +
                    '<br/><small>Lat: ' + element.Lat + ' Long: ' + element.Lng + '</small>' +

                    '<div class=\"eTip\">' +
                        '<div class=\"eType' + element.Type + ' eType\"></div>' +
                        '<div class=\"eC\">Click again to view!</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');

    $('#Info' + element.Id).css('display', 'none');
    $('.Element.' + element.Id).css('background-image', 'url(Content/Gallery/' + element.Type + '/Thumb/' + element.Content + '.png)');
}

/*todo: Server calls*/
var loadGroupsByDefault = 5;
function getElements(grouping) {
    if (canGetMore) {
        if (!gettingGroup) {
            gettingGroup = true;
            $.get('ManyDays/Elements?grouping=' + grouping, function(data) {
                if (data === "end") {
                    $('#EndLogo').css('opacity', 1);

                    postStatistic("User reached the end of the gallery.");

                    canGetMore = false;
                } else {
                    data = JSON.parse(data);
                    for (var e = 0; e < data.length; e++) {
                        addElement(new
                            mdElement(
                            data[e].Id,
                            data[e].Name,
                            data[e].Type,
                            data[e].Lat,
                            data[e].Lng,
                            data[e].Location,
                            data[e].Content,
                            data[e].Tip));
                    }

                    if (grouping == 1) {
                        var latLng = { lat: listOfElements[0].Lat, lng: listOfElements[0].Lng };
                        manyDaysMap.panTo(latLng);
                    }
                }

                resizeElementSize();

                groupLoaded++;

                gettingGroup = false;

                if (groupLoaded < loadGroupsByDefault) {
                    getElements(groupLoaded + 1);
                }

                checkEndInSight();
            });
        }
    }
}

var totalImages = 0;
function getManyDaysInformation() {
    $.get('ManyDays/Information', function (data) {

        var informationResult = data;
        totalImages = informationResult.split('+')[0];
        var lastUpload = informationResult.split('+')[1];

        $('#mdPageInfo').html('Last Upload: ' + lastUpload);
        $('#mdTitle').html('Many Days Images Loaded: 0 / ' + totalImages);
    });
}

function updateImageCount() {
    if (listOfElements.length < totalImages) {
        $('#mdTitle').html('Images Loaded: ' + listOfElements.length + ' / ' + totalImages + " <scrollTip>(scroll the gallery to load more)</scrollTip>");
    } else {
        $('#mdTitle').html('All ' + totalImages + " Many Days Images Loaded");
    }
}

var groupLoaded = 0;
var gettingGroup = false;
var canGetMore = true;
function initElements() {
    getElements(groupLoaded + 1);

    $('#mdGallery').on('scroll', function() { checkEndInSight() });
}

function checkEndInSight() {
    if (canGetMore) {
        var galleryHeight = $('#Elements').outerHeight() + $('#End').outerHeight();
        var bottomScrollPosition = $('#mdGallery').scrollTop() + $('#mdGallery').height();
        var loadZone = 70;

        if (bottomScrollPosition >= (galleryHeight - loadZone)) {
            //getElements(groupLoaded + 1);
        }
    }
}

function postStatistic(message) {
    $.post('ManyDays/Stats', {
        'statistic': message
    });
}








function getImageData() {
    $.get('ManyDays/Json', function (data) {
        console.log(data);
        debugger;
    });
}

























/*Initiate Many Days*/
function initManyDays() {
    /*old*/
    $('body').css('display', 'block');

    initMap(-36.89, 174.65);

    initMoveBar();

    initAboutContainer();

    resizePullBar();

    if ($('#mdMap').height() > 50) {
        loadingStatus(100);
        siteLoaded = true;
    }

    /*new*/
    setManyDaysDefaults();

    mdGetGallery();
    Promise.all(ManyDays.GalleryPromises).then(function () {
        mdBuildGallery();
        mdBuildMap();
    });

    registerOptions();
}

var ManyDays = {};
function setManyDaysDefaults() {
    ManyDays = {};
    ManyDays.GalleryPromises = [];
    ManyDays.ImagePromises = [];
    ManyDays.Gallery = 'http://manydays.co.uk/Content/Gallery/Image/';
    ManyDays.LoadGroup = 0;
    ManyDays.CanLoadThumbnails = true;
    ManyDays.ImagesPerRow = 8;
    ManyDays.AboutOpen = false;
}

/*MD About*/
function initAboutContainer() {
    $('#manyDays').on('click', function () { activateAbout() });
    $('#EndLogo').on('click', function () { activateAbout() });
    $('#mdAboutContainer').on('click', function (e) {
        if (e.target !== this)
            return;

        activateAbout();
    });
}

function activateAbout() {
    if (ManyDays.AboutOpen) {
        $('#mdAboutContainer').fadeOut(300);
    } else {
        $('#mdAboutContainer').fadeIn(500);
    }
    ManyDays.AboutOpen = !ManyDays.AboutOpen;
}

/*MD Gallery*/
function mdGetGallery() {
    var promise = $.get('ManyDays/Json');
    promise.done(function (data) {
        ManyDays.Json = JSON.parse(data);
    });   
    ManyDays.GalleryPromises.push(promise);
}

function mdBuildGallery() {
    for (var g = 0; g < ManyDays.Json.Md.length; g++) {
        for (var i = 0; i < ManyDays.Json.Md[g].Img.length; i++) {
            $('#Elements').append('<div class="md-Img" group="' + g + '" image="' + i + '"></div>');
        }
    }
    resizeImagesPerRow(ManyDays.ImagesPerRow);
    registerGalleryEvents();
    loadThumbnails();
}

function loadThumbnails() {
    if (ManyDays.LoadGroup >= ManyDays.Json.Md.length) {
        $('#loading-button').hide();
        return;
    }
    
    if(!ManyDays.CanLoadThumbnails) {
        return;
    }

    for (var i = 0; i < ManyDays.Json.Md[ManyDays.LoadGroup].Img.length; i++) {
        ManyDays.ImagePromises.push(getImageThumbnailPromise(ManyDays.LoadGroup, i));
    }

    Promise.all(ManyDays.ImagePromises).then(function () {
        ManyDays.LoadGroup++;
        loadThumbnails();
    });
}

function getImageThumbnailPromise(group, image) {
    return new Promise((resolve, reject) => {
        $('<img/>').attr('src', ManyDays.Gallery + 'Thumb/' + ManyDays.Json.Md[group].Img[image].Fn + '.png').on('load', function () {
            $(this).remove();
            $('.md-Img[group="' + group + '"][image="' + image + '"]').css('background-image', 'url(' + ManyDays.Gallery + 'Thumb/' + ManyDays.Json.Md[group].Img[image].Fn + '.png)');
            $('.md-Img[group="' + group + '"][image="' + image + '"]').fadeIn(800, function () {
                //console.log('loaded in (g, i): (' + group + ', ' + image + ')');
                resolve();
            });
        }).on('error', function (err) {
            console.log('Failed to get image, error: ' + err);
            resolve();
        });
    });
}

function registerGalleryEvents() {
    $('.md-Img').on('click', function () {
        cleanViewer();
        var group = $(this).attr('group');
        var image = $(this).attr('image');
        var element = {}
        element.Name = ManyDays.Json.Md[group].Tit;
        element.Location = ManyDays.Json.Md[group].Loc.Des;
        element.Lat = ManyDays.Json.Md[group].Loc.Lat;
        element.Lng = ManyDays.Json.Md[group].Loc.Lng;
        element.Tip = ManyDays.Json.Md[group].Des;
        setViewerText(element);
        var filename = ManyDays.Json.Md[group].Img[image].Fn;
        loadImageIntoViewer(filename);
        openViewer();
        showOnMap(element);
        history.replaceState(null, "Opened Image", "?g="+group + "&i="+image);
    });

    $('#mdViewerClose').on('click', function () {
        $('#mdViewer').fadeOut(200, function easeInOutExpo() { });
    });

    var queryString = window.location.search;
    if (queryString != null && queryString !== '') {
        var queries = queryString.split('?')[1].split('&');
        var group = null;
        var image = null;
        for (var i = 0; i < queries.length; i++) {
            if (queries[i].split('g=').length > 1) {
                group = queries[i].split('g=')[1];
            }
            if (queries[i].split('i=').length > 1) {
                image = queries[i].split('i=')[1];
            }
        }

        if (image != null && group != null) {
            $('.md-Img[group="' + group + '"][image="' + image + '"]').click();
        }
    }
}

/*MD Options*/
function registerOptions() {
    $('#settings-button').on('click', function () {
        loadOptions();
        $('#mdOptionsContainer').show();
    });

    $('.submit-options.confirm').on('click', function () {
        saveOptions();
        $('#mdOptionsContainer').fadeOut(200);
    });

    $('.submit-options.cancel').on('click', function () {
        $('#mdOptionsContainer').fadeOut(200);
    });

    $('#loading-button').on('click', function () {
        ManyDays.CanLoadThumbnails = !ManyDays.CanLoadThumbnails;
        loadThumbnails();

        if (ManyDays.CanLoadThumbnails) {
            $('#loading-button .md-Options-Text').text('PAUSE LOADING');
            $('#loading-button .md-Options-Cog').addClass('fa-spin');
        } else {
            $('#loading-button .md-Options-Text').text('RESUME LOADING');
            $('#loading-button .md-Options-Cog').removeClass('fa-spin');
        }
    });
}

function loadOptions() {
    $('.images-per-row .selection-value').val(ManyDays.ImagesPerRow);
}

function saveOptions() {
    resizeImagesPerRow($('.images-per-row .selection-value').val());
}

/*MD Map*/
/*todo: Map*/
var manyDaysMap;
function initMap(lat, lng) {
    var centerLatLang = { lat: lat, lng: lng };

    manyDaysMap = new google.maps.Map(document.getElementById('mdMap'), {
        center: centerLatLang,
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
}

function mdBuildMap() {
    for (var g = 0; g < ManyDays.Json.Md.length; g++) {
        var element = {};
        element.Lat = ManyDays.Json.Md[g].Loc.Lat;
        element.Lng = ManyDays.Json.Md[g].Loc.Lng;
        element.Location = ManyDays.Json.Md[g].Loc.Des;
        element.Id = g;
        var latLng = { lat: element.Lat, lng: element.Lng };
        placeGenericMapMarker(latLng, element.Location, g);

        var queryString = window.location.search;
        if (g == 0 && (queryString == null || queryString == '')) {
            showOnMap(element);
        }
    }
}

function showOnMap(element) {
    var latLng = { lat: element.Lat, lng: element.Lng };
    placeMapMarker(latLng, element.Location, element.Id);
    manyDaysMap.panTo(latLng);
}

var manyDaysCurrentMapMarker = null;
var currentMarkerEventListener;
function placeMapMarker(latLng, title, id) {
    if (manyDaysCurrentMapMarker !== null) {
        manyDaysCurrentMapMarker.setMap(null);
        google.maps.event.removeListener(currentMarkerEventListener);
    }

    manyDaysCurrentMapMarker = new google.maps.Marker({
        position: latLng,
        draggable: false,
        title: title,
        icon: '../Content/Map/markerActive.png',
        cursor: 'pointer',
        url: id
    });

    //currentMarkerEventListener = google.maps.event.addListener(manyDaysCurrentMapMarker, 'click', function () {
    //    currentElement = manyDaysCurrentMapMarker.url;
    //    openElement();
    //});

    manyDaysCurrentMapMarker.setMap(manyDaysMap);
}

function placeGenericMapMarker(latLng, title, id) {
    var newGenericMapMarker = new google.maps.Marker({
        position: latLng,
        draggable: false,
        title: title,
        icon: '../Content/Map/marker-small.png',
        cursor: 'pointer',
        url: id
    });

    newGenericMapMarker.setMap(manyDaysMap);

    //google.maps.event.addListener(newGenericMapMarker, 'click', function () {
    //    currentElement = newGenericMapMarker.url;
    //    openElement();
    //});
}

/*todo: Map resizing*/
var moveBar = false;
function initMoveBar() {
    $('#mdPullBar').css('top', ($('#mdMap').height() + $('#manyDaysBar').height()));

    $('#mdPullBar').on('touchstart', function (e) {
        moveBar = true;
        e.preventDefault();

        $('body').bind('touchend', function (e) {
            if (moveBar) {
                var position = e.originalEvent.changedTouches[0].clientY;

                if (position < 50)
                    position = 50;
                if (position > $(window).height() - 50)
                    position = $(window).height() - 50;

                $('#mdPullBar').css('top', position);

                resizePullBar();
            }

            $('body').unbind();
        });

        $('body').bind('touchmove', function (e) {
            if (moveBar) {
                var position = e.originalEvent.changedTouches[0].clientY;

                if (position < 50)
                    position = 50;
                if (position > $(window).height() - 50)
                    position = $(window).height() - 50;

                $('#mdPullBar').css('top', position);
            }
        });
    });

    $('#mdPullBar').on('mousedown', function (e) {
        moveBar = true;
        e.preventDefault();

        $('body').bind('mouseup', function (e) {
            if (moveBar) {
                var position = e.clientY;

                if (position < 50)
                    position = 50;
                if (position > $(window).height() - 50)
                    position = $(window).height() - 50;

                $('#mdPullBar').css('top', position);

                resizePullBar();
            }

            $('body').unbind();
        });

        $('body').bind('mousemove', function (e) {
            if (moveBar) {
                var position = e.clientY;

                if (position < 50)
                    position = 50;
                if (position > $(window).height() - 50)
                    position = $(window).height() - 50;

                $('#mdPullBar').css('top', position);
            }
        });
    });

}

function resizePullBar() {
    $('#mdMap').height($('#mdPullBar').position().top - $('#manyDaysBar').height());
    $('#mdGallery').height($(window).height() - $('#mdPullBar').height() - $('#mdMap').height() - $('#manyDaysBar').height() - 18);
    google.maps.event.trigger(manyDaysMap, 'resize');
    $('#mdPullBar').css('left', ($(window).width() - $('#mdMap').width()) / 2);
    checkEndInSight();
}

/*Helper Functions*/
function resizeImagesPerRow(imagesPerRow) {
    ManyDays.ImagesPerRow = imagesPerRow;
    var imageDimension = $('#mdGallery').prop('clientWidth') / ManyDays.ImagesPerRow;
    $('.md-Img').width(imageDimension);
    $('.md-Img').height(imageDimension);
}
