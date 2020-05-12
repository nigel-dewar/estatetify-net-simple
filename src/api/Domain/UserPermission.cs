using Domain.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class UserPermission
    {
        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public string PropertyId { get; set; }

        public virtual Property Property { get; set; }

        public string Relation { get; set; } // Relation = Owner, Agent, AgencyStaff

        public string Value { get; set; }

    }
}
