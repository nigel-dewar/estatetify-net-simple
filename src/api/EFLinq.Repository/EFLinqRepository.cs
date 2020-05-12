
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;

namespace EFLinq.Repository
{
    public class EFLinqRepository : IEFLinqRepository
    {
        private readonly DataContext _context;

        public EFLinqRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PostCodeModel>> GetPostCodes(string q)
        {
            try
            {
                var Query = $"%{q?.ToLower()}%";

                string[] words = q.Split(' ');

                int matchedPostCode = 0;

                foreach (string word in words)
                {
                    if (word.Length == 4)
                    {
                        int n;
                        bool isNumeric = int.TryParse(word, out n);
                        if (isNumeric)
                        {
                            matchedPostCode = int.Parse(word);
                        }
                    }
                }

                using (_context)
                {
                    return await _context.PostCodes.Where(x =>
                          string.IsNullOrEmpty(q) ||
                          (
                            EF.Functions.Like(x.Code.ToString(), Query) ||
                            EF.Functions.Like(x.Locality.ToLower(), Query) ||
                            EF.Functions.Like(x.State.ToLower(), Query)
                        )

                    ).Select(x => new PostCodeModel
                    {
                        PostCode = x.Code,
                        State = x.State,
                        Locality = x.Locality,
                        Long = x.Long,
                        Lat = x.Lat,
                        Label = x.Locality + ", " + x.State + ", " + x.Code,
                        Suburb = x.Suburb
                    }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("ERROR at GetPostCodes: " + ex.Message);
            }
        }

        public async Task<IEnumerable<PostCodeModel>> GetPostCodesBySlug(string q)
        {
            try
            {
                using (_context)
                {
                    var Suburbs = string.IsNullOrEmpty(q) ? new List<string>() : q.Split('|').ToList();

                    return await _context.PostCodes
                        .Where(x => Suburbs.Any() == false || Suburbs.Contains(x.Suburb))
                        .Select(x => new PostCodeModel
                        {
                            PostCode = x.Code,
                            State = x.State,
                            Locality = x.Locality,
                            Label = x.Locality + ", " + x.State + ", " + x.Code,
                            Suburb = x.Suburb
                        }).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("ERROR at GetPostCodesBySlug: " + ex.Message);
            }
        }

        public async Task<PropertiesReturnDTO> FindProperties(string mode, int? page, string suburbs, string propertyTypes, string features, int? minPrice, int? maxPrice, string bedRooms, string bathRooms, string parking)
        {
            try
            {
                //var Query = $"%{q?.ToLower()}%";
                var Suburbs = string.IsNullOrEmpty(suburbs) ? new List<string>() : suburbs.Split(',').ToList();
                var PropertyTypes = string.IsNullOrEmpty(propertyTypes) ? new List<string>() : propertyTypes.Split(',').ToList();
                var Features = string.IsNullOrEmpty(features) ? new List<string>() : features.Split(',').ToList();
                var BedRooms = string.IsNullOrEmpty(bedRooms) ? new List<string>() : bedRooms.Split(',').ToList();
                var BathRooms = string.IsNullOrEmpty(bathRooms) ? new List<string>() : bathRooms.Split(',').ToList();
                var Parkings = string.IsNullOrEmpty(parking) ? new List<string>() : parking.Split(',').ToList();

                int minBedRoom = 1;
                int maxBedRoom = 10;

                int minBathRoom = 0;
                int maxBathRoom = 10;

                int minParking = 0;
                int maxParking = 10;


                if (BedRooms.Any())
                {
                    if (BedRooms[0].Contains("+"))
                    {
                        minBedRoom = 5;
                    }
                    else
                    {
                        minBedRoom = Int32.Parse(BedRooms[0]);
                    }

                    if (BedRooms[1].Contains("+"))
                    {
                        maxBedRoom = 20;
                    }
                    else
                    {
                        maxBedRoom = Int32.Parse(BedRooms[1]);
                    }
                }

                if (BathRooms.Any())
                {
                    if (BathRooms[0].Contains("+"))
                    {
                        minBathRoom = 5;
                    }
                    else
                    {
                        minBathRoom = Int32.Parse(BathRooms[0]);
                    }

                    if (BathRooms[1].Contains("+"))
                    {
                        maxBathRoom = 20;
                    }
                    else
                    {
                        maxBathRoom = Int32.Parse(BathRooms[1]);
                    }
                }

                if (Parkings.Any())
                {
                    if (Parkings[0].Contains("+"))
                    {
                        minParking = 5;
                    }
                    else
                    {
                        minParking = Int32.Parse(Parkings[0]);
                    }

                    if (Parkings[1].Contains("+"))
                    {
                        maxParking = 20;
                    }
                    else
                    {
                        maxParking = Int32.Parse(Parkings[1]);
                    }
                }


                IQueryable<Property> properties = from p in _context.Properties select p;



                properties = properties.Where(x => Suburbs.Any() == false || Suburbs.Contains(x.SuburbSlug.ToString()));
                properties = properties.Where(x => PropertyTypes.Any() == false || PropertyTypes.Contains(x.PropertyType.Type));

                properties = properties.Where(x => BedRooms.Any() == false || x.Bedrooms >= minBedRoom);
                properties = properties.Where(x => BedRooms.Any() == false || x.Bedrooms <= maxBedRoom);

                properties = properties.Where(x => BathRooms.Any() == false || x.Bathrooms >= minBathRoom);
                properties = properties.Where(x => BathRooms.Any() == false || x.Bathrooms <= maxBathRoom);

                properties = properties.Where(x => Parkings.Any() == false || x.ParkingSpaces >= minParking);
                properties = properties.Where(x => Parkings.Any() == false || x.ParkingSpaces <= maxParking);
                string Type = "";

                if (mode == "rent")
                {
                    properties = properties.Where(x => minPrice.HasValue == false || x.RentPrice >= minPrice.Value);
                    properties = properties.Where(x => maxPrice.HasValue == false || x.RentPrice <= maxPrice.Value);
                    properties = properties.Where(x => x.IsForRent == true);
                    Type = "Rent";
                    //properties = properties.Include(x => x.RentListing);
                }

                if (mode == "buy")
                {
                    properties = properties.Where(x => minPrice.HasValue == false || x.BuyPrice >= minPrice.Value);
                    properties = properties.Where(x => maxPrice.HasValue == false || x.BuyPrice <= maxPrice.Value);
                    properties = properties.Where(x => x.IsForSale == true);
                    Type = "Buy";
                    //properties = properties.Include(x => x.SaleListing);
                }

                // Only select active properties
                properties = properties.Where(x => x.IsActive == true).Include(s => s.Images);


                // run includes - these dontg work properly - will have to investigate why later
                //var listings = await properties.Include(x => x.Listings).ThenInclude(x => x.Agency).ToListAsync();
                //properties = properties.Include(x => x.Listings).ThenInclude(x => x.Agency);
                //properties = properties.Include(x => x.Listings).ThenInclude(x => x.Agent);

                // get total to be returned
                var total = properties.Count();

                int takeAmount = 20;
                int skipAmount = 0;
                int availablePages = total / takeAmount;

                if (!page.HasValue)
                {
                    page = 0;
                    //skipAmount = 0;
                }
                else
                {

                    if (page < 0)
                    {
                        page = 0;
                    };
                    if (page == 1)
                    {
                        page = 0;
                    }
                }


                skipAmount = takeAmount * page.Value;



                properties = properties.Skip(skipAmount);

                properties = properties.Take(takeAmount);


                //properties = properties.Include(x => x.Listings);

                //properties = properties.Include(x => x.Listings);

                var results = await properties.ToListAsync();

                // reset page to fix zero value

                if (page == 0)
                {
                    page = 1;
                }

                PropertiesReturnDTO returnObject;

                if (!results.Any())
                {
                    returnObject = new PropertiesReturnDTO
                    {
                        Total = total,
                        Properties = null,
                        AvailablePages = availablePages,
                        CurrentPageNumber = page.Value
                    };
                    return returnObject;
                }

                var propsToReturn = new List<PropertyListViewModel>();

                foreach (var s in results)
                {

                    //if (listings.Any()) {
                    //    listing = s.Listings.Where(x => x.ListingType == Type && x.Active == true).FirstOrDefault();
                    //}
                    var listing = await _context.Listings
                        .Where(x => x.PropertyId == s.Id && x.Active == true && x.ListingType == Type)
                        .Include(x => x.Agency).ThenInclude(x => x.AgencyCompany)
                        .Include(x => x.Agent)
                        .FirstOrDefaultAsync();

                    var item = new PropertyListViewModel
                    {
                        Id = Guid.Parse(s.Id),
                        Slug = s.Slug,
                        Name = s.Name,
                        ShortDescription = s.ShortDescription,
                        Thumbnail = s.Images.Where(x=>x.IsMain)?.FirstOrDefault()?.ImageUrl,
                        Suburb = s.Suburb,
                        SuburbSlug = s.SuburbSlug,
                        State = s.State,
                        PostCode = s.PostCode,
                        Bathrooms = s.Bathrooms,
                        Bedrooms = s.Bedrooms,
                        ParkingSpaces = s.ParkingSpaces,
                        LandSize = s.LandSize,
                        Images = s.Images
                    };

                    if (listing != null)
                    {

                        item.Price = listing.Price;

                        var listingObject = new ListingDTO();

                        listingObject.Id = listing.Id;
                        listingObject.Price = listing.Price;
                        listingObject.DateCreated = listing.DateCreated;
                        listingObject.DateListingExpires = listing.DateListingExpires;
                        listingObject.IsPremium = listing.IsPremium;
                        listingObject.ListingType = listing.ListingType;
                        listingObject.IsListedByAgent = listing.IsListedByAgent;
                        listingObject.IsPrivateSeller = listing.IsPrivateSeller;

                        item.Listing = listingObject;

                        if (listing.Agency != null)
                        {

                            var agencyDTO = new AgencyDTO
                            {
                                Id = Guid.Parse(listing.Agency.Id),
                                AgencyCompanyName = listing.Agency.AgencyCompanyName,
                                AgencyOfficeName = listing.Agency.AgencyOfficeName,
                                LogoImageUrl = "/images/" + listing.Agency.AgencyCompany.LogoImageUrl,
                                BrandColor = listing.Agency.AgencyCompany.BrandColor
                            };
                            listingObject.Agency = agencyDTO;

                        }

                        if (listing.Agent != null)
                        {

                            var agentDTO = new AgentDTO
                            {
                                Id = Guid.Parse(listing.Agent.Id)
                                //EmailAddress = listing.Agent.EmailAddress,
                                //FirstName = listing.Agent.FirstName,
                                //LastName = listing.Agent.LastName,
                                //MobileNumber = listing.Agent.MobileNumber
                            };
                            listingObject.Agent = agentDTO;

                        }

                    }


                    propsToReturn.Add(item);
                }

                // order the results
                var orderedResults = propsToReturn.OrderByDescending(x => x.Listing.IsPremium);

                // return results with total amount as well
                returnObject = new PropertiesReturnDTO
                {
                    Total = total,
                    Properties = orderedResults,
                    AvailablePages = availablePages,
                    CurrentPageNumber = page.Value
                };

                return returnObject;

            }
            catch (Exception ex)
            {
                throw new Exception("ERROR returning FindProperties query " + ex.Message);
                //return BadRequest(ex.Message);
            }
        }

        public async Task<PropertyListViewModel> GetProperty(string slug)
        {
            try
            {
                using (_context) {
                    string[] splitSlug = slug.Split(new[] { "-L-" }, StringSplitOptions.None);
                    var propertySlug = splitSlug[0];
                    Guid listingId = Guid.Parse(splitSlug[1]);
                    //foreach (var sp in splitSlug) {
                    //    Console.WriteLine(sp);
                    //}
                    var prop = await _context.Properties.Where(a => a.Slug == propertySlug).Include(a => a.Listings).SingleOrDefaultAsync();
                    var listing = await _context.Listings.Where(a => Guid.Parse(a.Id) == listingId).Include(a => a.Agency).ThenInclude(a => a.AgencyCompany).Include(a => a.Agent).SingleOrDefaultAsync();

                    PropertyListViewModel propertyObject = new PropertyListViewModel();

                    propertyObject.Id = Guid.Parse(prop.Id);
                    propertyObject.ShortDescription = prop.ShortDescription;
                    propertyObject.Description = prop.Description;
                    propertyObject.Bathrooms = prop.Bathrooms;
                    propertyObject.Bedrooms = prop.Bedrooms;
                    propertyObject.LandSize = prop.LandSize;
                    propertyObject.PostCode = prop.PostCode;
                    propertyObject.Name = prop.Name;
                    propertyObject.ParkingSpaces = prop.ParkingSpaces;
                    propertyObject.Price = listing.Price;
                    propertyObject.Slug = prop.Slug;
                    propertyObject.State = prop.State;
                    propertyObject.SuburbSlug = prop.SuburbSlug;
                    propertyObject.Suburb = prop.Suburb;
                    propertyObject.Thumbnail = prop.Thumbnail;

                    ListingDTO listingObject = new ListingDTO();

                    listingObject.Id = listing.Id;
                    listingObject.DateCreated = listing.DateCreated;
                    listingObject.DateListingExpires = listing.DateListingExpires;
                    listingObject.IsPremium = listing.IsPremium;
                    listingObject.Price = listing.Price;
                    listingObject.ListingType = listing.ListingType;
                    listingObject.IsListedByAgent = listing.IsListedByAgent;
                    listingObject.IsPrivateSeller = listing.IsPrivateSeller;

                    // If listing has any agencies with it
                    if (listing.Agency != null) {
                        AgencyDTO agencyObject = new AgencyDTO();
                        agencyObject.AgencyCompanyName = listing.Agency.AgencyCompanyName;
                        agencyObject.AgencyOfficeName = listing.Agency.AgencyOfficeName;
                        agencyObject.BrandColor = listing.Agency.AgencyCompany.BrandColor;
                        agencyObject.LogoImageUrl = "/images/" + listing.Agency.AgencyCompany.LogoImageUrl;
                        listingObject.Agency = agencyObject;
                    }

                    if (listing.Agent != null) {
                        AgentDTO agentObject = new AgentDTO();
                        agentObject.Id = Guid.Parse(listing.Agent.Id);
                        listingObject.Agent = agentObject;
                        //EmailAddress = listing.Agent.EmailAddress,
                        //FirstName = listing.Agent.FirstName,
                        //LastName = listing.Agent.LastName,
                        //MobileNumber = listing.Agent.MobileNumber
                    }

                    propertyObject.Listing = listingObject;
                    
                    return propertyObject;
                }
            }
            catch (Exception ex)
            {

                throw new Exception("ERROR at GetProperty: " + ex.Message);
            }
        }

        public async Task<string> GetPropertyDesc(string slug)
        {
            try
            {
                using (_context) {
                    var propDesc = await _context.Properties.Where(a => a.Slug == slug).Select(x => x.Description).SingleOrDefaultAsync();
                    return propDesc;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("ERROR at GetPropertyDesc: " + ex.Message);
            }
        }

        // public async Task<List<ImageDTO>> GetPropertyImages(string propertyId)
        // {
        //     try
        //     {
        //         var images = await (from t in _context.Images
        //                             where t.PropertyId == propertyId
        //                             select new ImageDTO
        //                             {
        //                                 Id = t.Id,
        //                                 IsMain = t.IsMain,
        //                                 ThumbnailUrl = t.ThumbnailUrl,
        //                                 PropertyId = t.PropertyId,
        //                                 ImageUrl = t.ImageUrl
        //                             }).ToListAsync();
        //         return images;
        //     }
        //     catch (Exception ex)
        //     {
        //
        //         throw new Exception("ERROR at GetPropertyImages: " + ex.Message);
        //     }
        // }

        public async Task<FiltersListViewModel> GetLookupFilters()
        {
            try
            {
                using (_context)
                {
                    var propertyTypes = await _context.PropertyTypes
                        .ToListAsync();

                    var features = await _context.Features
                        .ToListAsync();

                    return new FiltersListViewModel
                    {
                        PropertyTypes = propertyTypes,
                        Features = features
                    };
                }
            }
            catch (Exception ex)
            {
                throw new Exception("ERROR at GetLookupFilters: " + ex.Message);
            }
        }

        public async Task<ListingDTO> CreateListing(CreateListingInDTO listingIn)
        {
            try
            {
                var listing = new ListingDTO();
                //using (_context)
                //{
                //    var listing = _context.listing.Add(new Listing
                //    {
                //        Id = 
                //    });
                //}
                return listing;
            }
            catch (Exception ex)
            {
                throw new Exception("ERROR at GetLookupFilters: " + ex.Message);
            }
        }
        

    }
}
