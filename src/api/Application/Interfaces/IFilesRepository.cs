using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Application.Models.Images;

namespace Application.Interfaces
{
    public interface IFilesRepository
    {
        Task<AddFileResponse> UploadFiles(string bucketName, IList<IFormFile> formFiles);

        Task<string> UploadFile(IFormFile formFile);

        Task<IEnumerable<ListFilesResponse>> ListFiles(string bucketName);

        Task DownloadFile(string bucketName, string fileName);

        Task<DeleteFileResponse> DeleteFile(string fileName);
    }
}