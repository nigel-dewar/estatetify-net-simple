using System;

namespace Domain.Models
{
    public class CreateListingInDTO
    {
        public DateTimeKind UsersDateTime { get; set; }

        public string BrowserType { get; set; }

        public string DeviceType { get; set; }

        public string UserId { get; set; }

        public string IpAddress { get; set; }

    }
}
