using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Models;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Activities
{
    public class DetailsActivity
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var item = await _context.Activities
                    .SingleOrDefaultAsync(x=>x.Id == request.Id);

                if (item == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });
                }
                
                var itemToReturn = _mapper.Map<Activity, ActivityDto>(item);

                return itemToReturn;
                
            }
        }
    }
}