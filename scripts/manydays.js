$(document).ready(function() 
{
    InitialiseContainers();

    InitialiseMap();
});

$(window).resize(function() 
{
    ResizeContainers();
})