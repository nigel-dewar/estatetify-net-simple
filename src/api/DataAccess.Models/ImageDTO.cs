using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class ImageDTO
    {
        public string Id { get; set; }

        public bool IsMain { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        public string PropertyId { get; set; }

        public string ThumbnailUrl { get; set; }


    }
}
