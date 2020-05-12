using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Properties
{
    public class Attend
    {
        public class Command : IRequest 
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var property = await _context.Properties.FindAsync(request.Id);

                if (property == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {Property = "could not find property"});
                }

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                var attendance =
                    await _context.UserProperties.SingleOrDefaultAsync(x =>
                        x.PropertyId == property.Id && x.AppUserId == user.Id);

                if (attendance != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "Already attending");
                }

                attendance = new UserProperty
                {
                    Property = property,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserProperties.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0;
                
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }

    
}