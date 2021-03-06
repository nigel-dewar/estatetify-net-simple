﻿using System.Collections.Generic;
using Domain;

namespace Application.Handlers.Profiles
{
    public class Profile
    {
        public string DisplayName { get; set; }

        public string UserName { get; set; }

        public string Image { get; set; }

        public string Bio { get; set; }

        public ICollection<Image> Images { get; set; }
        
    }
}