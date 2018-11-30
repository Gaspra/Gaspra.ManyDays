using ImageUploader.Resizer;
using Newtonsoft.Json;
using System.IO;
using System.Linq;

namespace ImageUploader.Metadata
{
    public class ImageMetadata
    {
        private readonly string jsonUrl;
        private ManydaysImages imageMetadata;

        public ImageMetadata(string jsonUrl)
        {
            this.jsonUrl = jsonUrl;
            this.imageMetadata = ResolveJson();
        }

        public ManydaysImages ResolveJson()
        {
            var json = DownloadJsonAsString();

            var imageModels = JsonConvert.DeserializeObject<ManydaysImages>(json);

            return imageModels;
        }

        private string DownloadJsonAsString()
        {
            using(var webClient = new System.Net.WebClient())
            {
                var json = webClient.DownloadString(jsonUrl);

                return json;
            }
        }

        public void AddMetaDataAndProcessImage(ImageModel image, string inputPath, string outputPath)
        {
            var imageList = imageMetadata.Images.ToList();
            var nextId = imageList.Last().Id + 1;

            var newImageModel = new ImageModel
            {
                Id = nextId,
                Location = image.Location,
                Name = image.Name,
                Filename = $"{nextId}_{image.Name}"
            };

            ResizeImage.Process(inputPath, $@"{outputPath}\raw\{newImageModel.Filename}", ResizeImage.ImageType.Raw);
            ResizeImage.Process(inputPath, $@"{outputPath}\preview\{newImageModel.Filename}", ResizeImage.ImageType.Preview);
            ResizeImage.Process(inputPath, $@"{outputPath}\thumbnail\{newImageModel.Filename}", ResizeImage.ImageType.Thumbnail);

            imageList.Add(newImageModel);
            imageMetadata.Images = imageList;
        }

        public void SaveMetaData(string path)
        {
            var metadataJson = JsonConvert.SerializeObject(imageMetadata);
            File.WriteAllText(path, metadataJson);
        }

    }
}
