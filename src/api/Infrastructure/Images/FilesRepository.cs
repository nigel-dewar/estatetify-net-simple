﻿using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Models.Images;
using Microsoft.Extensions.Options;

namespace Infrastructure.Images
{
    public class FilesRepository : IFilesRepository
    {

        // readonly AmazonS3Config ClientConfig;
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public FilesRepository(IOptions<ImagesSettings> settings)
        {

            var clientConfig = new AmazonS3Config();
            clientConfig.ServiceURL = settings.Value.S3_HOST_ENDPOINT;
            _s3Client = new AmazonS3Client(settings.Value.S3_ACCESS_KEY, settings.Value.S3_SECRET_KEY, clientConfig);
            _bucketName = settings.Value.S3_BUCKET_NAME;
        }

        // upload doco https://docs.aws.amazon.com/AmazonS3/latest/dev/HLuploadFileDotNet.html
        public async Task<AddFileResponse> UploadFiles(string bucketName, IList<IFormFile> formFiles) 
        {
            var response = new List<string>();

            // var address = "93-evertamia-st-runcorn-3141";

            foreach (var file in formFiles)
            {
                var uploadRequest = new TransferUtilityUploadRequest
                {
                    InputStream = file.OpenReadStream(),
                    Key = $"{file.FileName}",
                    BucketName = bucketName,
                    CannedACL = S3CannedACL.PublicRead
                };

                using (var fileTransferUtility = new TransferUtility(_s3Client))
                {
                    await fileTransferUtility.UploadAsync(uploadRequest);
                }

                var expiryUrlRequest = new GetPreSignedUrlRequest
                {
                    BucketName = bucketName,
                    Key = file.FileName,
                    Expires = DateTime.Now.AddMinutes(1)
                };

                var url = _s3Client.GetPreSignedURL(expiryUrlRequest);

                response.Add(url);
            }

            return new AddFileResponse
            {
                PreSignedUrl = response
            };
        }
        
        public async Task<string> UploadFile(IFormFile formFile) 
        {

            
            var uploadRequest = new TransferUtilityUploadRequest
            {
                InputStream = formFile.OpenReadStream(),
                Key = $"{formFile.FileName}",
                BucketName = _bucketName,
                CannedACL = S3CannedACL.PublicRead
            };

            using (var fileTransferUtility = new TransferUtility(_s3Client))
            {
                await fileTransferUtility.UploadAsync(uploadRequest);
            }

            var expiryUrlRequest = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = formFile.FileName,
                Expires = DateTime.Now.AddMinutes(1)
            };

            var url = _s3Client.GetPreSignedURL(expiryUrlRequest);

            return url;


        }

        public async Task<IEnumerable<ListFilesResponse>> ListFiles(string bucketName)
        {
            var responses = await _s3Client.ListObjectsAsync(bucketName);

            return responses.S3Objects.Select(b => new ListFilesResponse
            {
                BucketName = b.BucketName,
                Key = b.Key,
                Owner = b.Owner.DisplayName,
                Size = b.Size
            });
        }

        public async Task DownloadFile(string bucketName, string fileName)
        {
            var pathAndFileName = $"C:\\S3Temp\\{fileName}";

            var downloadRequest = new TransferUtilityDownloadRequest
            {
                BucketName = bucketName,
                Key = fileName,
                FilePath = pathAndFileName
            };

            using (var transferUtility = new TransferUtility(_s3Client)) 
            {
                await transferUtility.DownloadAsync(downloadRequest);
            }
            
        }

        public async Task<DeleteFileResponse> DeleteFile(string fileName)
        {


            var multiObjectDeleteRequest = new DeleteObjectsRequest
            {
                BucketName = _bucketName
            };

            multiObjectDeleteRequest.AddKey(fileName);

            var response = await _s3Client.DeleteObjectsAsync(multiObjectDeleteRequest);

            return new DeleteFileResponse
            {
                NumberOfDeletedObjects = response.DeletedObjects.Count
            };



        }


    }
}
