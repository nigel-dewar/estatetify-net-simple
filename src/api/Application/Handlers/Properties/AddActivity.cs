using System;
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

namespace Application.Handlers.Properties
{
    public class AddActivity
    {
        public class Command : IRequest
        {
            public string Id { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }

            public string Category { get; set; }

            public DateTime Date { get; set; }

            public string City { get; set; }

            public string Venue { get; set; }

            public string ActivityType { get; set; }
            
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
                
                var property = await _context.Properties.SingleOrDefaultAsync(x=>x.Id == request.Id);

                var activity = new Activity
                {
                    Id = Guid.NewGuid(),
                    Title = request.Title,
                    Category = request.Category,
                    City = request.City,
                    Date = request.Date,
                    Description = request.Description,
                    Venue = request.Venue,
                    ActivityType = request.ActivityType
                };

                property.Activities.Add(activity);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
            
                throw new Exception("Problem saving image");
                    

            }
        }
    }
}