using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Models.Properties;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Properties
{
    public class Details
    {
        public class Query : IRequest<PropertyDto>
        {
            public string Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, PropertyDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PropertyDto> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var property = await _context.Properties
                    .SingleOrDefaultAsync(x=>x.Id == request.Id);

                if (property == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });
                }

                var propertyToReturn = _mapper.Map<Property, PropertyDto>(property);

                return propertyToReturn;
            }
        }
    }
}
