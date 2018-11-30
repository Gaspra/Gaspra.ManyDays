using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace ImageUploader.Resizer
{
    public class ResizeImage
    {
        private static readonly float maxRaw = 2560;
        private static readonly float maxPreview = 840;
        private static readonly float maxThumbnail = 350;

        public enum ImageType
        {
            Raw,
            Preview,
            Thumbnail
        }

        public static void Process(string input, string output, ImageType type)
        {
            using(Image<Rgba32> image = Image.Load(input))
            {
                (float width, float height) imageProportions = (0,0);

                switch(type)
                {
                    case ImageType.Raw:
                        imageProportions = SetToMax(maxRaw, (image.Width, image.Height));
                        break;
                    case ImageType.Preview:
                        imageProportions = SetToMax(maxPreview, (image.Width, image.Height));
                        break;
                    case ImageType.Thumbnail:
                        imageProportions = SetToMax(maxThumbnail, (image.Width, image.Height));
                        break;
                }

                var resizedImage = Resize(image, imageProportions.width, imageProportions.height);

                resizedImage.Save($"{output}.png");
            }
        }

        private static Image<Rgba32> Resize(Image<Rgba32> image, float width, float height)
        {
            image.Mutate(x => x.Resize((int)width, (int)height));
            return image;
        }

        private static (float width, float height) SetToMax(float max, (float width, float height) size)
        {
            if(size.width >= size.height && size.width > max)
            {
                var original = size.width;

                size.width = max;

                size.height = size.height * ((float)max / (float)original);
            }
            else if(size.height > max)
            {
                var original = size.height;

                size.height = max;

                size.width = size.width * ((float)max / (float)original);
            }

            return size;
        }
    }
}
