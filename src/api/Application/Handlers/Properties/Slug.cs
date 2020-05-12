using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Models.Properties;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Properties
{
    public class Slug
    {
        public class Query : IRequest<PropertyDto>
        {
            public string Slug { get; set; }

        }

        public class Handler : IRequestHandler<Query, PropertyDto>
        {


            private readonly IPropertiesRepository _propertiesRepository;

            public Handler(IPropertiesRepository propertiesRepository)
            {
                _propertiesRepository = propertiesRepository;
            }

            public async Task<PropertyDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _propertiesRepository.GetPropertyBySlug(request.Slug);

            }
        }
    }
}
