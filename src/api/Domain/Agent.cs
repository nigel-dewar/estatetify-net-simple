using Domain.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class Agent
    {
        public string Id { get; set; }

        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public string LicenceNumber { get; set; } // all agents in AU must have this

        public string AgencyId { get; set; } // doesnt not have to belong to an agency

        public virtual Agency Agency { get; set; } // does not have to belong to an agency

        public virtual List<Listing> Listings { get; set; }

        public virtual List<Property> Properties { get; set; }

    }
}
