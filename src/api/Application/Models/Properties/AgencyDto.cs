using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Models.Properties
{
    public class AgencyDto
    {
        public Guid Id { get; set; }

        public string AgencyCompanyName { get; set; } // Ray White for example

        public string AgencyOfficeName { get; set; } // Ray White Runcorn for example

        public string LogoImageUrl { get; set; }

        public string BrandColor { get; set; }
    }
}
