using System;
using System.Collections.Generic;
using Domain;

namespace Application.Models.Properties
{
    public class ListingDto
    {
        public string Id { get; set; }

        public string PropertyId { get; set; }
        

        public DateTimeOffset DateCreated { get; set; } = DateTimeOffset.Now;

        public DateTimeOffset DateListingExpires { get; set; } // date the listing will expire

        // Only 1 type of listing can be active at once. For example, only 1 rent type can be active at once
        // Only 1 type of Buy listing can be active at once
        public bool Active { get; set; } = false;

        // Asking price
        public decimal Price { get; set; } = 0.00M;

        public string ListingType { get; set; } // rent, buy, auction etc

        public bool IsPremium { get; set; } = false; // default is standard

        // username who created to listing
        public string UserName { get; set; }

        public string UserId { get; set; }

        public bool IsListedByAgent { get; set; } = false;

        public bool IsPrivateSeller { get; set; } = false; // default is not private seller

        public string AgencyId { get; set; } // reference to Agency
        
        public string AgentId { get; set; }
        public AgencyDto Agency { get; internal set; }
        public AgentDto Agent { get; internal set; }
    }
}