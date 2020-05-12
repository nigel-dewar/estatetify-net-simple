using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Users
{
    public class SetMainImage
    {
        public class Command : IRequest 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
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

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(x=>x.Images).SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                var image = user.Images.FirstOrDefault(x => x.Id == request.Id);
                
                if (image == null) throw new RestException(HttpStatusCode.NotFound, "Image not found");
                
                var currentMain = user.Images.FirstOrDefault(x => x.IsMain);

                currentMain.IsMain = false;
                
                image.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;
                
                if (success) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }
        }
    }
}