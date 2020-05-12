using System.Collections.Generic;

namespace Domain
{
    public class AgencyCompany
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string LogoImageUrl { get; set; }

        public string BrandColor { get; set; }

        public virtual List<Agency> AgencyOffices { get; set; } = new List<Agency>();

    }
}
