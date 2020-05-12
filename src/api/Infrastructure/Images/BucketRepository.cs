using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Models;
using Application.Models.Images;
using Microsoft.Extensions.Options;

namespace Infrastructure.Images
{
    public class BucketRepository : IBucketRepository
    {
        
        private readonly IAmazonS3 _s3Client;

        public BucketRepository(IOptions<ImagesSettings> settings)
        {
            var clientConfig = new AmazonS3Config();
            clientConfig.ServiceURL = settings.Value.S3_HOST_ENDPOINT;
            _s3Client = new AmazonS3Client(settings.Value.S3_ACCESS_KEY, settings.Value.S3_SECRET_KEY, clientConfig);
        }

        public async Task<bool> DoesS3BucketExist(string bucketName)
        {
            return await _s3Client.DoesS3BucketExistAsync(bucketName);
        }

        public async Task<CreateBucketResponse> CreateBucket(string bucketName)
        {
            var putBucketRequest = new PutBucketRequest
            {
                BucketName = bucketName,
                UseClientRegion = true
            };

            var response = await _s3Client.PutBucketAsync(putBucketRequest);

            return new CreateBucketResponse
            {
                BucketName = bucketName,
                RequestId = response.ResponseMetadata.RequestId
            };
        }

        public async Task<IEnumerable<ListS3BucketsResponse>> ListBuckets()
        {
            var response = await _s3Client.ListBucketsAsync();

            return response.Buckets.Select(b => new ListS3BucketsResponse
            {
                BucketName = b.BucketName,
                CreationDate = b.CreationDate
            });
        }

        public async Task DeleteBucket(string bucketName)
        {
            await _s3Client.DeleteBucketAsync(bucketName);
        }
    }
}
