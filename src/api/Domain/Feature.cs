using System.Collections.Generic;

namespace Domain
{
    public class Feature
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool Outdoor { get; set; } = false;

        public virtual List<PropertyFeature> ProductFeatures { get; set; } = new List<PropertyFeature>();
    }
}
