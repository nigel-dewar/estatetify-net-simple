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

namespace Application.Handlers.Activities
{
    public class Delete
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

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                var activity = await _context.Activities
                    .SingleOrDefaultAsync(x=>x.Id == request.Id);
                
                if (activity == null) throw new Exception("Could not find Activity");

                var host = _context.UserActivities.FirstOrDefault(x => x.IsHost);

                if (host?.AppUser?.UserName != user.UserName)
                {
                    throw new RestException(HttpStatusCode.Forbidden, "Only the host can delete this activity");
                }
                

                _context.Remove(activity);
                
                var success = await _context.SaveChangesAsync() > 0;
                
                if (success) return Unit.Value;
                
                throw new Exception("Problem saving changes");
            }
        }
    }
}