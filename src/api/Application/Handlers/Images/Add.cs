using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Models.Images;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Handlers.Images
{
    public class AddImages
    {
        public class Command : IRequest<List<Image>>
        {
            public string bucketName { get; set; }
            public IList<IFormFile> formFiles { get; set; }
        }

        public class Handler : IRequestHandler<Command, List<Image>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _accessor;
            private readonly IFilesRepository _filesRepository;

            public Handler(DataContext context, IMapper mapper, IUserAccessor accessor, IFilesRepository filesRepository)
            {
                _context = context;
                _mapper = mapper;
                _accessor = accessor;
                _filesRepository = filesRepository;
            }

            public async Task<List<Image>> Handle(Command request, CancellationToken cancellationToken)
            {
                
                if (request.formFiles == null) {
                    throw new RestException(HttpStatusCode.BadRequest, "No files to upload");
                }

                try
                {
                    AddFileResponse response = await _filesRepository.UploadFiles(request.bucketName, request.formFiles);
                    if (response == null)
                    {
                        throw new RestException(HttpStatusCode.BadRequest, "Bad Request");
                    }

                    var imageList = new List<Image>();
                    foreach (var imageUrl in response.PreSignedUrl)
                    {
                        var image = new Image
                        {
                            ImageUrl = imageUrl
                        };
                        imageList.Add(image);
                        
                    }
                    
                    
                    
                    _context.Images.AddRange(imageList);
                    
                    var success = await _context.SaveChangesAsync() > 0;

                    if (success) return imageList;
                
                    throw new Exception("Problem saving changes");
                    
                }
                catch (Exception ex)
                {

                    throw ex;
                }
                
                
                
                
            }
        }
    }
}