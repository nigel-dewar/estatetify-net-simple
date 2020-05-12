using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Models
{
    public class ImageDto
    {
        public Guid Id { get; set; }

        public bool IsMain { get; set; } = false;
        
        public string FileName { get; set; }
        
        public string ImageUrl { get; set; }
        
        public string ThumbnailUrl { get; set; }
        
        public string CreatedById { get; set; }
    }
}