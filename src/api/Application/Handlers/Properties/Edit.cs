using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Handlers.Properties
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Id { get; set; }

            public string Name { get; set; }
            
            public string Suburb { get; set; }

            public int PropertyTypeId { get; set; }

            public string Description { get; set; }

            public int? Bedrooms { get; set; }

            public int? Bathrooms { get; set; }

            public int? ParkingSpaces { get; set; }

            public decimal? LandSize { get; set; }

            public string PostCode { get; set; }

            public string StreetNumber { get; set; }

            public string Route { get; set; }

            public string Locality { get; set; }

            public string Country { get; set; }
            

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Bedrooms).NotEmpty();
                RuleFor(x => x.Bathrooms).NotEmpty();
                RuleFor(x => x.ParkingSpaces).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.PropertyTypeId).NotEmpty();
                RuleFor(x => x.LandSize).NotEmpty();
                RuleFor(x => x.Suburb).NotEmpty();
                RuleFor(x => x.PostCode).NotEmpty();
                RuleFor(x => x.StreetNumber).NotEmpty();
                RuleFor(x => x.Route).NotEmpty();
                RuleFor(x => x.Locality).NotEmpty();
                RuleFor(x => x.Country).NotEmpty();
            }
        }

        public class Hander : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Hander(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var property = await _context.Properties.FindAsync(request.Id);

                if (property == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { property = "Not Found" });
                }
                
                var success = false;
                try
                {
                    property.Name = request.Name;
                    property.Suburb = request.Suburb;
                    property.PropertyTypeId = request.PropertyTypeId;
                    property.Description = request.Description;
                    property.Bedrooms = request.Bedrooms ?? property.Bedrooms;
                    property.Bathrooms = request.Bathrooms ?? property.Bathrooms;
                    property.ParkingSpaces = request.ParkingSpaces ?? property.ParkingSpaces;
                    property.LandSize = request.LandSize ?? property.LandSize;
                    property.PostCode = request.PostCode ?? property.PostCode;
                    property.StreetNumber = request.StreetNumber ?? property.StreetNumber;
                    property.Route = request.Route ?? property.Route;
                    property.Locality = request.Locality ?? property.Locality;
                    property.Country = request.Country ?? property.Country;
                    
                    _context.Update(property);

                    success = await _context.SaveChangesAsync() > 0;
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

                

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }

    }
}
