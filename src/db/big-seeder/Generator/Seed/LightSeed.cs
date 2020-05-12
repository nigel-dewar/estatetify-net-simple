using DataAccess;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Generator.Seed
{
    public class LightSeed
    {
        ApplicationDbContext _context;

        public LightSeed(ApplicationDbContext context)
        {
            _context = context;
        }

        public int Run() {

            try
            {
                // Seed Agency Companies
                if (!_context.agency_companies.Any())
                {

                    var agency_companies = new List<AgencyCompany> {

                        new AgencyCompany {
                        Id = Guid.Parse("0875e13e-906f-41c2-a197-159ab021a740").ToString(),
                        Name = "RayWhite",
                        LogoImageUrl = "ray-white.jpg",
                        BrandColor = "#FEE536"
                        },
                        new AgencyCompany
                        {
                            Id = Guid.Parse("2e45030b-c22a-4807-a5da-bddd9be51895").ToString(),
                            Name = "LJ Hooker",
                            LogoImageUrl = "lj-hooker.jpg",
                            BrandColor = "#000000"
                        },
                        new AgencyCompany
                        {
                            Id = Guid.Parse("9e57a71d-2712-4761-b7ba-d5895c96d334").ToString(),
                            Name = "@Realty",
                            LogoImageUrl = "realty.jpg",
                            BrandColor = "#1F1F1F"
                        },
                        new AgencyCompany
                        {
                            Id = Guid.Parse("ebd7e5ba-7bae-401c-9308-faa078cb5034").ToString(),
                            Name = "Remax",
                            LogoImageUrl = "remax.jpg",
                            BrandColor = "#fff"
                        },
                        new AgencyCompany
                        {
                            Id = Guid.Parse("fcb78c7a-3765-434d-82fa-87e6ed8f160a").ToString(),
                            Name = "YONG",
                            LogoImageUrl = "yong.jpg",
                            BrandColor = "#E4322C"
                        }
                    };

                    _context.agency_companies.AddRange(agency_companies);
                    _context.SaveChanges();
                }

                // seed agengies in Runcorn
                if (!_context.agencies.Any())
                {

                    var agencies = new List<Agency> {

                        new Agency {
                            Id = Guid.Parse("00192d8b-a84a-4b72-8e9b-dc2cc756f245").ToString(),
                            AgencyCompanyId = Guid.Parse("2e45030b-c22a-4807-a5da-bddd9be51895").ToString(),
                            PostCode = "4113", // runcorn
                            LogoImageUrl = "lj-hooker.jpg",
                            Locality = "RUNCORN",
                            AgencyCompanyName = "LJ Hooker",
                            AgencyOfficeName = "LJ Hooker Runcorn"
                        }
                    };

                    _context.agencies.AddRange(agencies);
                    _context.SaveChanges();
                }

                // seed user types
                if (!_context.user_types.Any())
                {

                    var user_types = new List<UserType> {

                        new UserType
                        {
                            Id = 1,
                            Name = "Renter"
                        },
                        new UserType
                        {
                            Id = 2,
                            Name = "Owner"
                        },
                        new UserType
                        {
                            Id = 3,
                            Name = "Agent"
                        },
                        new UserType
                        {
                            Id = 4,
                            Name = "Agency"
                        },
                        new UserType
                        {
                            Id = 5,
                            Name = "AgencyCompany"
                        }
                    };

                    _context.user_types.AddRange(user_types);
                    _context.SaveChanges();
                }


                // seed users
                if (!_context.users.Any())
                {

                    var users = new List<User> {

                        new User // owner
                        {
                            Id = "083d673f-8d6c-4f3a-bc5e-e2ab780fcdc6",
                            Email = "nigeldewar@live.com",
                            UserTypeId = 2
                        },
                        new User // agent
                        {
                            Id = "5e08c89f-25a6-4077-a7e4-362e69826fb2",
                            Email = "sue.jane@live.com",
                            UserTypeId = 4
                        }
                    };

                    _context.users.AddRange(users);
                    _context.SaveChanges();
                }

                // seed agents
                if (!_context.agents.Any())
                {

                    var agents = new List<Agent> {

                        new Agent { // agent does not belong to agency
                            Id = Guid.Parse("0012a7af-3f3f-4398-9e08-27500c9381e7").ToString(),
                            UserId = "19b6f9db-c994-43ba-bf6a-e787593e5b58",
                            LicenceNumber = "G89-393922"
                        }
                    };

                    _context.agents.AddRange(agents);
                    _context.SaveChanges();
                }

                // seed property types
                if (!_context.property_types.Any())
                {

                    var property_types = new List<PropertyType> {

                        new PropertyType
                        {
                            Id = 1,
                            Type = "House"
                        },
                        new PropertyType
                        {
                            Id = 2,
                            Type = "Apartment"
                        },
                        new PropertyType
                        {
                            Id = 3,
                            Type = "Unit"
                        },
                        new PropertyType
                        {
                            Id = 4,
                            Type = "Villa"
                        },
                        new PropertyType
                        {
                            Id = 5,
                            Type = "Townhouse"
                        },
                        new PropertyType
                        {
                            Id = 6,
                            Type = "Acreage"
                        }
                    };

                    _context.property_types.AddRange(property_types);
                    _context.SaveChanges();
                }

                // seed features
                if (!_context.features.Any())
                {

                    var features = new List<Feature> {

                        new Feature
                        {
                            Id = 1,
                            Name = "Alarm System"
                        },
                        new Feature
                        {
                            Id = 2,
                            Name = "Intercom"
                        },
                        new Feature
                        {
                            Id = 3,
                            Name = "Ensuite"
                        },
                        new Feature
                        {
                            Id = 4,
                            Name = "Study"
                        },
                        new Feature
                        {
                            Id = 5,
                            Name = "Dishwasher"
                        },
                        new Feature
                        {
                            Id = 6,
                            Name = "Built-in wardrobes"
                        }
                    };

                    _context.features.AddRange(features);
                    _context.SaveChanges();
                }

                // seed properties
                if (!_context.properties.Any())
                {

                    var properties = new List<Property> {

                        new Property
                        {
                            Id = "002d9b6a-2d89-480c-b9f7-8a52277b6204",
                            Slug = "5-maynard-place-berserker-4113",
                            Name = "5 Maynard Place",
                            Suburb = "RUNCORN",
                            SuburbSlug = "runcorn-4113",
                            PostCode = "4113",
                            State = "QLD",
                            Description = "Beautiful property in Runcorn, its very nice etc etc",
                            IsForSale = true,
                            BuyPrice = 5858482.00M,
                            LandSize = 894M,
                            ShortDescription = "Short Desc of property in Runcorn",
                            AvailableDate = DateTimeOffset.Now,
                            ParkingSpaces = 2,
                            Bathrooms = 2,
                            Bedrooms = 4,
                            IsActive = true,
                            PropertyTypeId = 1

                        }
                    };

                    _context.properties.AddRange(properties);
                    _context.SaveChanges();
                }

                // seed listings
                if (!_context.listings.Any())
                {

                    var listings = new List<Listing> {

                        new Listing { // selling thorugh private agent - non agency
                            Id = "000d455a-72ce-4b22-a625-4c2d280a395c",
                            PropertyId = "002d9b6a-2d89-480c-b9f7-8a52277b6204",
                            Active = true,
                            AgentId = "0012a7af-3f3f-4398-9e08-27500c9381e7",
                            DateCreated = DateTimeOffset.Now,
                            IsListedByAgent = true,
                            IsPremium = false,
                            ListingType = "Buy",
                            DateListingExpires = DateTimeOffset.Now.AddDays(10),
                            UserId = "19b6f9db-c994-43ba-bf6a-e787593e5b58", // Sue Jane
                            UserName = "Sue Jane",
                            Price = 5858482.00M

                        }
                    };

                    _context.listings.AddRange(listings);
                    _context.SaveChanges();
                }

                // seed property permissions
                if (!_context.property_permissions.Any())
                {

                    var property_permissions = new List<PropertyPermission> {

                        new PropertyPermission
                        {
                            Id = "BA67C121-D4F2-4A44-8677-FDEE3561F46E",
                            UserId = "083d673f-8d6c-4f3a-bc5e-e2ab780fcdc6",
                            PropertyId = "002d9b6a-2d89-480c-b9f7-8a52277b6204",
                            Claims = new List<Claim>{
                                new Claim
                                {
                                    Id = "EFFDDB28-5F89-41CD-9C71-7BFC4EC5B1F9",
                                    Type = "EDIT",
                                    Value = "can_edit_property"
                                },
                                new Claim
                                {
                                    Id = "FA742BA8-BFCC-4512-AD50-CE28D25FE5BB",
                                    Type = "EDIT",
                                    Value = "full_control"
                                }
                            }
                        }
                    };

                    _context.property_permissions.AddRange(property_permissions);
                    _context.SaveChanges();
                }



                // seed claims
                if (!_context.claims.Any())
                {
                    var claims = new List<Claim> {

                        new Claim
                        {
                            Id = "EFFDDB28-5F89-41CD-9C71-7BFC4EC5B1F9",
                            Type = "EDIT",
                            Value = "can_edit_property",
                        },
                        new Claim
                        {
                            Id = "FA742BA8-BFCC-4512-AD50-CE28D25FE5BB",
                            Type = "EDIT",
                            Value = "full_control"
                        }
                            };

                    _context.claims.AddRange(claims);
                    _context.SaveChanges();
                }

                // seed permissions
                if (!_context.permissions.Any())
                {
                    var permissions = new List<Permission> {

                        new Permission
                        {
                            Id = "BA67C121-D4F2-4A44-8677-FDEE3561F46E",
                            UserId = "083d673f-8d6c-4f3a-bc5e-e2ab780fcdc6",
                            PropertyId = "002d9b6a-2d89-480c-b9f7-8a52277b6204",
                            PermissionType = "Property",
                            Value = "READ"
                        },
                        new Permission
                        {
                            Id = "6FAC9F08-FF42-4F05-A2DB-FCC53DA18BDC",
                            UserId = "083d673f-8d6c-4f3a-bc5e-e2ab780fcdc6",
                            PropertyId = "002d9b6a-2d89-480c-b9f7-8a52277b6204",
                            PermissionType = "Property",
                            Value = "WRITE"
                        },
                        new Permission
                        {
                            Id = "1885902C-6968-4454-8C1C-DC87BC98CC2F",
                            UserId = "083d673f-8d6c-4f3a-bc5e-e2ab780fcdc6",
                            PropertyId = "002d9b6a-2d89-480c-b9f7-8a52277b6204",
                            ListingId = "000d455a-72ce-4b22-a625-4c2d280a395c",
                            PermissionType = "Listing",
                            Value = "WRITE"
                        }
                    };

                    _context.permissions.AddRange(permissions);
                    _context.SaveChanges();
                }

                // seed permission_claims
                if (!_context.permission_claims.Any()) {
                    var permission_claims = new List<PermissionClaim> {

                        new PermissionClaim
                        {
                            ClaimId = "EFFDDB28-5F89-41CD-9C71-7BFC4EC5B1F9",
                            PermissionId = "BA67C121-D4F2-4A44-8677-FDEE3561F46E"
                        }
                    };

                    _context.permission_claims.AddRange(permission_claims);
                    _context.SaveChanges();
                }

                // seed permission claims - experimental



                return 0;

            }
            catch (Exception)
            {

                return 1;
            }

        }
    }
}
