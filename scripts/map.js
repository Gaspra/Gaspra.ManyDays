var googleKey = "AIzaSyBb_OlGJ8FlcWBvL8eTY_niLspLZK6jnfw";
var googleScript;
var loadGoogleApiPromise = [];
var manydaysMap;
var manydaysLocations = {};

var mapPromise;
var mapResolver;
function ConstructMapPromise()
{
    mapPromise = new Promise(function(resolve, reject)
    {
        googleScript = document.createElement("script");
        googleScript.type = "text/javascript";
        googleScript.src = "https://maps.googleapis.com/maps/api/js?key="+googleKey+"&callback=ResolveMapPromise";
        $("#scripts").append(googleScript);
        mapResolver = resolve;
    });
}

function ResolveMapPromise()
{
    mapResolver();
}

function InitialiseMap(image)
{
    manydaysLocations.Groups = [];

    manydaysMap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: image.Location.Lat, lng: image.Location.Lng },
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
}

function SetMapLocation(image)
{
    var latLng = { lat: image.Location.Lat, lng: image.Location.Lng };
    manydaysMap.panTo(latLng);
}

function AddMapMarker(image)
{
    var mapGroup = null;
    manydaysLocations.Groups.forEach(function(group) {
        if(group.Lat == image.Location.Lat)
        {
            if(group.Lng == image.Location.Lng)
            {
                group.Images.push(image.Id);
                mapGroup = group;
            }
        }
    });

    if(mapGroup == null)
    {
        mapGroup = image.Location;
        mapGroup.Id = manydaysLocations.Groups.length;
        mapGroup.Images = [];
        mapGroup.Images.push(image.Id);

        manydaysLocations.Groups.push(mapGroup);

        var latLng = { lat: mapGroup.Lat, lng: mapGroup.Lng };
        var mapMarker = new google.maps.Marker({
            position: latLng,
            draggable: false,
            title: mapGroup.Name
        });

        mapMarker.setMap(manydaysMap);

        google.maps.event.addListener(mapMarker, 'click', function() {
            window.history.pushState('manydays+image_'+idList, 'image_'+idList, CreateMapGroupUri(mapGroup.Id));
        });
    }
}

function CreateMapGroupUri(id)
{
    var mapGroup = manydaysLocations.Groups[id];
    var idList = "";
    mapGroup.Images.forEach(function(image)
    {
        idList+=image;
        if(image != mapGroup.Images[mapGroup.Images.length - 1])
        {
            idList += ",";
        }
    });

    return '?i='+idList;
}
