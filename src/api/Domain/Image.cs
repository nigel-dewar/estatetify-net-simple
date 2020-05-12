using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Image
    {
        [Key]
        public Guid Id { get; set; }

        public bool IsMain { get; set; } = false;
        
        [Required]
        public string FileName { get; set; }

        [Required]
        public string ImageUrl { get; set; }
        
        public string ThumbnailUrl { get; set; }
        public string CreatedById { get; set; }
    }
}
