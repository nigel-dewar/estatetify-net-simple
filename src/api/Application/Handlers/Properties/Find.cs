using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Models;
using Application.Models.Properties;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Properties
{
    public class Find
    {
        public class Query : IRequest<PropertiesFindDto> {
            public string Mode { get; set; }
            public int? Page { get; set; }
            public string Suburbs { get; set; }
            public string PropertyTypes { get; set; }
            public string Features { get; set; }
            public int? MinPrice { get; set; }
            public int? MaxPrice { get; set; }
            public string BedRooms { get; set; }
            public string BathRooms { get; set; }
            public string Parking { get; set; }
        }

        public class Handler : IRequestHandler<Query, PropertiesFindDto>
        {

            private readonly IPropertiesRepository _propertiesRepository;

            public Handler(IPropertiesRepository propertiesRepository)
            {
                _propertiesRepository = propertiesRepository;
            }

            public async Task<PropertiesFindDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _propertiesRepository.FindProperties(
                    request.Mode,
                    request.Page,
                    request.Suburbs,
                    request.PropertyTypes,
                    request.Features,
                    request.MinPrice,
                    request.MaxPrice,
                    request.BedRooms,
                    request.BathRooms,
                    request.Parking);
            }
        }
    }
}
