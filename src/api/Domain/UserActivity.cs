﻿using System;
using System.ComponentModel.DataAnnotations;
using Domain.Identity;

namespace Domain
{
    public class UserActivity
    {
        public string AppUserId { get; set; }

        public virtual AppUser AppUser { get; set; }

        public Guid ActivityId { get; set; }

        public virtual Activity Activity { get; set; }

        public DateTime DateJoined { get; set; }

        public bool IsHost { get; set; }
    }
}