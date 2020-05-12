using System;

namespace Domain.Models
{
    public class ListingInDTO
    {
        public string Id { get; set; }

        // reference to the property
        public string PropertyId { get; set; }

        public decimal Price { get; set; }

        public bool Active { get; set; }

        public string ListingType { get; set; } // rent, buy, auction etc

        public bool IsPremium { get; set; } = false; // default is standard

        // username who created to listing
        public string UserName { get; set; }

        public string UserId { get; set; }

        public bool IsListedByAgent { get; set; }

        public bool IsPrivateSeller { get; set; }

        public string AgencyId { get; set; }

        public string AgentId { get; set; }

    }
}
