using Domain.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class UserProperty
    {
        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public string PropertyId { get; set; }

        public virtual Property Property { get; set; }

        public DateTime DateJoined { get; set; }

        public bool IsHost { get; set; }


    }
}
