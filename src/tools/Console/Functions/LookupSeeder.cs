using properties.api.Data;
using properties.api.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console.Functions
{
    public class LookupSeeder
    {
        private ListingsDbContext _context;
        public LookupSeeder(ListingsDbContext context)
        {
            _context = context;
        }
        internal void Setup()
        {
            AddPropertyFeatures();
            AddPropertyTypes();
        }

        private void AddPropertyTypes()
        {
            if (_context.PropertyTypes.Any() == false)
            {
                var propertyTypes = new List<string>() { "House", "Appartment", "Unit", "Villa", "Townhouse", "Acerage" };

                propertyTypes.ForEach(c => _context.Add(new PropertyType
                {
                    Name = c
                }));

                _context.SaveChanges();
            }
        }

        private void AddPropertyFeatures()
        {
            if (_context.Features.Any() == false)
            {
                var features = new List<Feature>() {
                    new Feature{ Name = "Alarm System", Outdoor = false},
                    new Feature{ Name = "Intercom", Outdoor = false},
                    new Feature{ Name = "Ensuite", Outdoor = false},
                    new Feature{ Name = "Study", Outdoor = false},
                    new Feature{ Name = "Dishwasher", Outdoor = false},
                    new Feature{ Name = "Built-in wardrobes", Outdoor = false},
                    new Feature{ Name = "Ducted vacuum system", Outdoor = false},
                    new Feature{ Name = "Gym", Outdoor = false},
                    new Feature{ Name = "Workshop", Outdoor = false},
                    new Feature{ Name = "Indoor spa", Outdoor = false},
                    new Feature{ Name = "Rampus room", Outdoor = false},
                    new Feature{ Name = "Floorboards", Outdoor = false},
                    new Feature{ Name = "Broadband internet available", Outdoor = false},
                    new Feature{ Name = "Pay TV access", Outdoor = false},
                    new Feature{ Name = "Open fireplace", Outdoor = false},
                    new Feature{ Name = "Ducted heating", Outdoor = false},
                    new Feature{ Name = "Ducted cooling", Outdoor = false},
                    new Feature{ Name = "Split-sytem heating", Outdoor = false},
                    new Feature{ Name = "Split-sytem air conditioning", Outdoor = false},
                    new Feature{ Name = "Air conditioning", Outdoor = false},
                    new Feature{ Name = "Gas heating", Outdoor = false},
                    new Feature{ Name = "Reverse cycle air conditioning", Outdoor = false},
                    new Feature{ Name = "Evaporative cooling", Outdoor = false},
                    new Feature{ Name = "Carport", Outdoor = true},
                    new Feature{ Name = "Garage", Outdoor = true},
                    new Feature{ Name = "Open car spaces", Outdoor = true},
                    new Feature{ Name = "Remote garage", Outdoor = true},
                    new Feature{ Name = "Secure parking", Outdoor = true},
                    new Feature{ Name = "Swimming pool - Above ground", Outdoor = true},
                    new Feature{ Name = "Swimming pool - In ground", Outdoor = true},
                    new Feature{ Name = "Outside spa", Outdoor = true},
                    new Feature{ Name = "Tennis court", Outdoor = true},
                    new Feature{ Name = "Balcony", Outdoor = true},
                    new Feature{ Name = "Deck", Outdoor = true},
                    new Feature{ Name = "Courtyard", Outdoor = true},
                    new Feature{ Name = "Outdoor entertaining area", Outdoor = true},
                    new Feature{ Name = "Shed", Outdoor = true},
                    new Feature{ Name = "Fully fenced", Outdoor = true}
                };

                _context.Features.AddRange(features);

                _context.SaveChanges();
            }
        }
    }
}
