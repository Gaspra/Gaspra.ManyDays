var googleKey = "AIzaSyBb_OlGJ8FlcWBvL8eTY_niLspLZK6jnfw";
var googleScript;
var loadGoogleApiPromise = [];
var manydaysMap;

function InitialiseMap()
{
    LoadGoogleScript();
}

function LoadGoogleScript()
{
    googleScript = document.createElement("script");
    googleScript.type = "text/javascript";
    googleScript.src = "https://maps.googleapis.com/maps/api/js?key="+googleKey+"&callback=LoadedGoogleApi";
    $("#scripts").append(googleScript);
}

function LoadedGoogleApi()
{
    manydaysMap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 1, lng: 1 },
        zoom: 6,
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
    var latLng = { lat: image.Location.Lat, lng: image.Location.Lng };
    var mapMarker = new google.maps.Marker({
        position: latLng,
        draggable: false,
        title: image.Location.Name
        //cursor: pointer
        //url: link to image
    });

    mapMarker.setMap(manydaysMap);
}
