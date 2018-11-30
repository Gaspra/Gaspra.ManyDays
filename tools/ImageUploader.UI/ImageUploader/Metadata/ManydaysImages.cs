using System.Collections.Generic;

namespace ImageUploader.Metadata
{
    /*
        {
            "Id": 2,
            "Name": "Exploring Auckland",
            "Location": {
                "Name": "Mt. Eden, Auckland, NZ",
                "Lat": -36.87765,
                "Lng": 174.764267
            },
            "Filename": "2_ExploringAuckland"
        }
    */

    public class ManydaysImages
    {
        public IEnumerable<ImageModel> Images { get; set; }
    }

    public class ImageModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ImageLocationModel Location { get; set; }
        public string Filename { get; set; }
    }

    public class ImageLocationModel
    {
        public string Name { get; set; }
        public float Lat { get; set; }
        public float Lng { get; set; }
    }
}
