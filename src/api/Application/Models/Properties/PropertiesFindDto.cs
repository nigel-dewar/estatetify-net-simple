using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.Models.Properties
{
    public class PropertiesFindDto
    {
        public int Total { get; set; }

        public int AvailablePages { get; set; }

        public int CurrentPageNumber { get; set; }


        public List<PropertyDto> Properties { get; set; }
    }
}
