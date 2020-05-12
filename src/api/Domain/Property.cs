using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Property
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Slug { get; set; }

        public string Suburb { get; set; }
        public string SuburbSlug { get; set; }
        public string State { get; set; }
        public string MainImage { get; set; }
        public string Thumbnail { get; set; }
        public string ShortDescription { get; set; }

        [Required]
        public int PropertyTypeId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int Bedrooms { get; set; }

        [Required]
        public int Bathrooms { get; set; }

        [Required]
        public int ParkingSpaces { get; set; }

        [Required]
        public decimal LandSize { get; set; }

        [Required]
        public string PostCode { get; set; }

        public string StreetNumber { get; set; }
        public string Route { get; set; }
        public string Locality { get; set; }
        public string AdministrativeAreaLevel1 { get; set; }
        public string AdministrativeAreaLevel2 { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string CreatedById { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = false; 
        public bool IsForSale { get; set; } = false;
        public bool IsForRent { get; set; } = false;
        public bool IsForAuction { get; set; } = false;
        public decimal BuyPrice { get; set; }
        public decimal RentPrice { get; set; }
        public DateTimeOffset AvailableDate { get; set; }

        public virtual PropertyType PropertyType { get; set; }
        
        public virtual ICollection<PropertyFeature> PropertyFeatures { get; set; }
        
        public virtual ICollection<Listing> Listings { get; set; }
        
        public virtual ICollection<Image> Images { get; set; }
        
        public virtual ICollection<UserPermission> UserPermissions { get; set; }

        public virtual ICollection<UserProperty> UserProperties { get; set; }
        
        public virtual ICollection<Activity> Activities { get; set; }
    }
}