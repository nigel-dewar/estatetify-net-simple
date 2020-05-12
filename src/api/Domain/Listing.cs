using Domain.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Listing
    {
        [Key]
        public string Id { get; set; }

        public string PropertyId { get; set; }

        public virtual Property Property { get; set; } = null;

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
        public string AppUserId { get; set; }

        public virtual AppUser AppUser {get;set;}

        public bool IsListedByAgent { get; set; } = false;

        public bool IsPrivateSeller { get; set; } = false; // default is not private seller

        public virtual Agency Agency { get; set; } = null; // reference to Agency

        public string AgencyId { get; set; } // reference to Agency

        public virtual Agent Agent { get; set; } = null;

        public string AgentId { get; set; }

    }
}
