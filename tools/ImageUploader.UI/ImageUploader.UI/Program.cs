using ImageUploader.Metadata;
using ImageUploader.Resizer;
using System;
using System.Collections.Generic;
using System.IO;

namespace ImageUploader.UI
{
    class Program
    {
        private static readonly string manydaysJson = @"http://manydays.co.uk/ManyDays.json";

        static void Main(string[] args)
        {
            Console.WriteLine("Process folder path:");
            var inputPath = Console.ReadLine();

            Console.WriteLine("Will process:");
            var filesToProcess = new List<string>();
            foreach(var file in Directory.GetFiles(inputPath))
            {
                Console.WriteLine($"{file}");
                filesToProcess.Add(file);
            }

            var imageModel = GetImageData();

            var outputPath = GetOutputPath(inputPath);
            Console.WriteLine($"Will be outputting images to: {outputPath}");

            var imageMetadata = new ImageMetadata(manydaysJson);
            Console.WriteLine($"Retrieved meta data from: {manydaysJson}");

            foreach(var file in filesToProcess)
            {
                Console.WriteLine($"Starting process of: {file}");

                imageMetadata.AddMetaDataAndProcessImage(imageModel, file, outputPath);

                Console.WriteLine($"Finished process of: {file}");
            }

            imageMetadata.SaveMetaData($@"{outputPath}\manydays.json");

            Console.WriteLine("Processed and saved meta data");
            Console.ReadLine();
        }

        static ImageModel GetImageData()
        {
            Console.WriteLine("Name prefix:");
            var name = Console.ReadLine();

            Console.WriteLine("Location name:");
            var locationName = Console.ReadLine();

            Console.WriteLine("Location lat:");
            float.TryParse(Console.ReadLine(), out var lat);

            Console.WriteLine("Location lng:");
            float.TryParse(Console.ReadLine(), out var lng);

            var imageModel = new ImageModel
            {
                Name = name,
                Location = new ImageLocationModel
                {
                    Name = locationName,
                    Lat = lat,
                    Lng = lng
                }
            };

            return imageModel;
        }

        static string GetOutputPath(string inputPath)
        {
            var outputPath = $@"{inputPath}\output";
            Directory.CreateDirectory($@"{outputPath}\raw");
            Directory.CreateDirectory($@"{outputPath}\preview");
            Directory.CreateDirectory($@"{outputPath}\thumbnail");
            return outputPath;
        }
    }
}
