using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Properties
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Id { get; set; }

            public string Name { get; set; }

            public string Slug { get; set; }

            public string Suburb { get; set; }

            public string SuburbSlug { get; set; }

            public string State { get; set; }

            public string MainImage { get; set; }

            public string Thumbnail { get; set; }

            public string ShortDescription { get; set; }

            public int PropertyTypeId { get; set; }

            public string Description { get; set; }

            public int Bedrooms { get; set; }

            public int Bathrooms { get; set; }

            public int ParkingSpaces { get; set; }

            public decimal LandSize { get; set; }

            public string PostCode { get; set; }

            public string StreetNumber { get; set; }

            public string Route { get; set; }

            public string Locality { get; set; }

            public string AdministrativeAreaLevel1 { get; set; }

            public string AdministrativeAreaLevel2 { get; set; }

            public string Country { get; set; }

            public string CreatedById { get; set; }

            public DateTime Created { get; set; } = DateTime.UtcNow;

            public bool IsActive { get; set; } = false;

            public bool IsForSale { get; set; } = false;

            public bool IsForRent { get; set; } = false;

            public bool IsForAuction { get; set; } = false;

            public decimal BuyPrice { get; set; }

            public decimal RentPrice { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command> {
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
            private readonly IUserAccessor _userAccessor;

            public Hander(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
      

                    string slug = null;

                    if (request.Locality != null && request.StreetNumber != null && request.PostCode != null)
                    {
                        slug = String.Concat(request.StreetNumber, " ", request.Route.Replace(" ", "-"), " ", request.Locality, " ", request.PostCode).ToLower().Replace(" ", "-");
                    }
                    else
                    {
                        slug = String.Concat(request.StreetNumber, " ", request.Route.Replace(" ", "-"), " ", request.PostCode).ToLower().Replace(" ", "-");
                    }

                    var checkPropExists = await _context.Properties.Where(x => x.Slug == slug).ToListAsync();
                    if (checkPropExists.Count > 0)
                    {
                        throw new Exception("This property already exists");
                    }

                    var userId = "083d673f-8d6c-4f3a-bc5e-e2ab780fcdc6";

                    var property = new Property
                    {
                        Id = request.Id,
                        Name = request.Name,
                        Slug = slug,
                        Suburb = request.Suburb,
                        SuburbSlug = request.SuburbSlug,
                        State = request.State,
                        PropertyTypeId = request.PropertyTypeId,
                        Description = request.Description,
                        Bedrooms = request.Bedrooms,
                        Bathrooms = request.Bathrooms,
                        ParkingSpaces = request.ParkingSpaces,
                        LandSize = request.LandSize,
                        PostCode = request.PostCode,
                        StreetNumber = request.StreetNumber,
                        Route = request.Route,
                        Locality = request.Locality,
                        AdministrativeAreaLevel1 = request.AdministrativeAreaLevel1,
                        AdministrativeAreaLevel2 = request.AdministrativeAreaLevel2,
                        Country = request.Country,
                        CreatedById = userId,
                        IsActive = request.IsActive,
                        IsForSale = request.IsForSale,
                        IsForRent = request.IsForRent,
                        IsForAuction = request.IsForAuction,
                        BuyPrice = request.BuyPrice,
                        RentPrice = request.RentPrice
                    };

                    _context.Properties.Add(property);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendee = new UserProperty
                {
                    AppUser = user,
                    Property = property,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                _context.UserProperties.Add(attendee);
                    
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                    
                throw new Exception("Problem saving changes");
    
                
            }
        }
    }
}
