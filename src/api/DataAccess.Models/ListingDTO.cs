using System;

namespace Domain.Models
{
    public class ListingDTO
    {
        public string Id { get; set; }

        // reference to the property
        public string PropertyId { get; set; }

        public DateTimeOffset DateCreated { get; set; } = DateTimeOffset.Now;
        public DateTimeOffset DateListingExpires { get; set; } // date the listing will expire

        public decimal Price { get; set; }

        public string ListingType { get; set; } // rent, buy, auction etc

        public bool IsPremium { get; set; } = false; // default is standard

        // username who created to listing
        public string UserName { get; set; }

        public string UserId { get; set; }

        public bool IsListedByAgent { get; set; }

        public bool IsPrivateSeller { get; set; } = false; // default is not private seller

        public AgencyDTO Agency { get; set; } = null; // reference to Agency

        public string AgencyId { get; set; }


        public AgentDTO Agent { get; set; }

        public string AgentId { get; set; }


    }
}
