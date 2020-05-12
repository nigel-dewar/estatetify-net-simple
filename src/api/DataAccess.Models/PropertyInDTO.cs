using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Models
{
    public class PropertyInDTO
    {
        public string Id { get; set; }

        // property details
        [Required]
        public int PropertyTypeId { get; set; }

        public string Description { get; set; }

        [Required]
        public int Bedrooms { get; set; }

        [Required]
        public int Bathrooms { get; set; }

        [Required]
        public int ParkingSpaces { get; set; }

        [Required]
        public decimal LandSize { get; set; }

        // address info
        [Required]
        public string StreetNumber { get; set; }

        [Required]
        public string Route { get; set; }

        public string Locality { get; set; }

        public string AdministrativeAreaLevel1 { get; set; }

        public string AdministrativeAreaLevel2 { get; set; }

        [Required]
        public string PostCode { get; set; }

        public string State { get; set; }

        [Required]
        public string Country { get; set; }


    }
}
