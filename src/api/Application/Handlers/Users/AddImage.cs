using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Users
{
    public class AddImage
    {
        public class Command : IRequest<Image>
        {
            public IFormFile File { get; set; }

        }

        public class Handler : IRequestHandler<Command, Image>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly IFilesRepository _filesRepository;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, IFilesRepository filesRepository)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
                _filesRepository = filesRepository;
            }

            public async Task<Image> Handle(Command request, CancellationToken cancellationToken)
            {
                
                if (request.File == null) {
                    throw new RestException(HttpStatusCode.BadRequest, "No file to upload");
                }
                

                var imageUploadResponse = await _filesRepository.UploadFile(request.File);
                if (imageUploadResponse == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "Could not upload image");
                }

                var user = await _context.Users.Include(x=>x.Images).SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());
                
                
                var simpleImageUrl = imageUploadResponse.Split('?')[0];
                var cdnUrl = $"https://cdn.estatetify.com/{request.File.FileName}";
                
                var image = new Image
                {
                    FileName = request.File.FileName,
                    ImageUrl = cdnUrl,
                    CreatedById = user.Id
                };

                if (!user.Images.Any(x => x.IsMain)) image.IsMain = true;
                
                
                user.Images.Add(image);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return image;
            
                throw new Exception("Problem saving image");
                    

            }
        }
    }
}