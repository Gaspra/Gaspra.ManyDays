var googleKey = "AIzaSyBb_OlGJ8FlcWBvL8eTY_niLspLZK6jnfw";
var loadGoogleApiPromise;
var manydaysMap;

function InitialiseMap() 
{
    loadGoogleApiPromise = new Promise(
        resolve => 
        {
            LoadGoogleScript();
        }
    );

    loadGoogleApiPromise.then(function() 
    {
        manydaysMap = new googleKey.maps.Map(document.getElementById("map"), {
            center: { lat: 1, lng: 1 },
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
    });
}

function LoadGoogleScript()
{
    var script = document.createElement("googleMapScript");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key="+googleKey;
    $("#scripts").append(script);
}