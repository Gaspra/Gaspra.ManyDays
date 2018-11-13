function GetAlbumTest()
{
    $.get('https://www.googleapis.com/storage/v1/b/manydays-gallery/o', function(data)
    {
        console.log(data);
    });
}
