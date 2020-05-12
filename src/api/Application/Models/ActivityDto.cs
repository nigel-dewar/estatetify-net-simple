using System;
using System.Collections.Generic;
using Domain;
using Newtonsoft.Json;

namespace Application.Models
{
    public class ActivityDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public DateTime Date { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        public string ActivityType { get; set; }
        
        [JsonProperty("attendees")]
        public virtual ICollection<AttendeeDto> UserActivities { get; set; }
        
        [JsonProperty("comments")]
        public virtual ICollection<CommentDto> Comments { get; set; }
        
    }
}