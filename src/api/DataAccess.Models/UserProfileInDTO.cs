using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Models
{
    public class UserProfileInDTO
    {
        [Required(ErrorMessage = "You must have an Id")]
        public string Id { get; set; }
        [Required(ErrorMessage = "You must have an Email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "You must have an UserTypeId")]
        public int UserTypeId { get; set; }
    }
}
