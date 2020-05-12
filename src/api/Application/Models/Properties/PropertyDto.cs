using System;
using System.Collections.Generic;
using Domain;
using Newtonsoft.Json;

namespace Application.Models.Properties
{
    public class PropertyDto
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

        // public UserProfile UserProfile { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;
        
        public bool IsActive { get; set; } = false; 
        
        public bool IsForSale { get; set; } = false;
        
        public bool IsForRent { get; set; } = false;
        
        public bool IsForAuction { get; set; } = false;
        
        public decimal BuyPrice { get; set; }
        
        public decimal RentPrice { get; set; }

        public decimal Price { get; set; }

        public DateTimeOffset AvailableDate { get; set; }
        
        // [JsonProperty("propertyType")]
        // public virtual PropertyTypeDto PropertyType { get; set; }
        
        // public virtual List<PropertyFeatureDto> PropertyFeatures { get; set; } = new List<PropertyFeatureDto>();
        //
        
        [JsonProperty("listings")]
        public virtual ICollection<ListingDto> Listings { get; set; }
        
        [JsonProperty("images")]
        public virtual List<ImageDto> Images { get; set; }
        
        // public virtual List<PropertyPermissionDto> PropertyPermissions { get; set; } = new List<PropertyPermissionDto>();
        //
        // public virtual List<PermissionDto> Permissions { get; set; } = new List<PermissionDto>();

        [JsonProperty("attendees")]
        public virtual ICollection<AttendeeDto> UserProperties { get; set; }
        
        [JsonProperty("activities")]
        public virtual ICollection<ActivityDto> Activities { get; set; }
        
    }
}