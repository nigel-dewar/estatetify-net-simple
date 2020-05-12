using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Models
{
    public class PropertyResult
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Slug { get; set; }

        public string Suburb { get; set; }

        public string SuburbSlug { get; set; }

        public string State { get; set; }

        public string MainImage { get; set; }

        public string Thumbnail { get; set; }


        public int? PropertyTypeId { get; set; }

        public string Description { get; set; }

        public int? Bedrooms { get; set; }

        public int? Bathrooms { get; set; }

        public int? ParkingSpaces { get; set; }

        public decimal? LandSize { get; set; }

        public string PostCode { get; set; }

        public string StreetNumber { get; set; }

        public string Route { get; set; }

        public string Locality { get; set; }

        public string AdministrativeAreaLevel1 { get; set; }

        public string AdministrativeAreaLevel2 { get; set; }

        public string Country { get; set; }


        public bool? IsActive { get; set; } = false;
        public bool? IsForSale { get; set; } = false;
        public bool? IsForRent { get; set; } = false;
        public bool? IsForAuction { get; set; } = false;
        public decimal? BuyPrice { get; set; }
        public decimal? RentPrice { get; set; }
    }
}
