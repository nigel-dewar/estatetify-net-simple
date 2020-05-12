using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Models
{
    public class FiltersListViewModel
    {
        public IEnumerable<PropertyType> PropertyTypes { get; set; }
        public IEnumerable<Feature> Features { get; set; }
    }
}
