﻿using System;
using Domain;
using Domain.Identity;

namespace Application.Models
{
    public class CommentDto
    {
        public Guid Id { get; set; }

        public string Body { get; set; }
        
        public DateTime CreatedAt { get; set; }

        public string UserName { get; set; }

        public string DisplayName { get; set; }

        public string Image { get; set; }
    }
}