using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain.Identity
{
    public class AppUser: IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public virtual ICollection<UserProperty> UserProperties { get; set; }
        
        public virtual ICollection<UserActivity> UserActivities { get; set; }

        public virtual ICollection<Image> Images { get; set; }

        public virtual ICollection<UserPermission> UserPermissions { get; set; }

        public virtual Agent Agent { get; set; }

        public virtual Agency Agency { get; set; }


    }
}
