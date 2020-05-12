using System;

namespace Domain.Models
{
    public class AgentDTO
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }
      
        public string LastName { get; set; }
    
        public string MobileNumber { get; set; }
       
        public string EmailAddress { get; set; }

        public string FullName
        {
            get
            {
                return FirstName + " " + LastName;
            }
        }

    }
}
