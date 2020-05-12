using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Models.Properties;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Properties
{
    public class List
    {
        public class Query : IRequest<List<PropertyDto>> {
        
        }

        public class Handler : IRequestHandler<Query, List<PropertyDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<PropertyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var properties = await _context.Properties
                    .ToListAsync();

                return _mapper.Map<List<Property>, List<PropertyDto>>(properties);
            }
        }
    }
}
