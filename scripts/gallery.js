//function GetAlbumTest()
//{
//    $.get('https://www.googleapis.com/storage/v1/b/manydays-gallery/o', function(data)
//    {
//        console.log(data);
//    });
//}


function InitialiseGallery()
{
    ImageCollection.Json["Images"].forEach(function(image) {
        InitialiseImage(image)
    });
}

function InitialiseImage(image)
{
    console.log(image.Id + ': ' + image.Name + ' ' + image.Location.Name + ' ' + image.Filename);
}

