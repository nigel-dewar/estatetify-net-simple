using System.Linq;

namespace Domain.Models
{
    public class PropertiesReturnDTO
    {
        public int Total { get; set; }

        public int AvailablePages { get; set; }

        public int CurrentPageNumber { get; set; }


        public IOrderedEnumerable<PropertyListViewModel> Properties { get; set; }


    }
}
