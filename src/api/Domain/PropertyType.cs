using System.Collections.Generic;

namespace Domain
{
    public class PropertyType
    {
        public int Id { get; set; }
        public string Type { get; set; }

        public virtual List<Property> Properties { get; set; } = new List<Property>();
    }
}
