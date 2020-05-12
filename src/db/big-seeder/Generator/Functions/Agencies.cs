
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using DataAccess;
using Domain.Entities;

namespace Console.Functions
{
    public class Agencies
    {
        Random random = new Random();

        private ApplicationDbContext _context;
        private List<AgencyCompany> agencyCompanies;
        private List<string> firstNames;
        private List<string> lastNames;
        private List<string> mobilePhones;

        public Agencies(ApplicationDbContext context)
        {
            _context = context;
        }

        internal void Setup() {
            firstNames = new List<string>
            {
                "Sam",
                "Walter",
                "Shela",
                "Nigel",
                "Neeka",
                "Sulin",
                "Tash",
                "Robert",
                "Michelle",
                "Sally"
            };

            lastNames = new List<string>
            {
                "Lee",
                "Chan",
                "Simpson",
                "Davis",
                "Black",
                "Brown",
                "Wilson",
                "McDonald"
            };

            mobilePhones = new List<string>
            {
                "0414 286 546",
                "0450 456 519",
                "0404 565 138"
            };
        }


        internal List<AgencyCompany> GetAgencyCompanies() {

            if (!_context.agency_companies.Any())
            {
                agencyCompanies = new List<AgencyCompany>
                {
                    new AgencyCompany {
                        Name = "Remax",
                        LogoImageUrl = "remax.jpg",
                        BrandColor = "#fff"
                    },
                    new AgencyCompany {
                        Name = "RayWhite",
                        LogoImageUrl = "ray-white.jpg",
                        BrandColor = "#FEE536"
                    },
                    new AgencyCompany {
                        Name = "LJ Hooker",
                        LogoImageUrl = "lj-hooker.jpg",
                        BrandColor = "#000000"
                    },
                    new AgencyCompany {
                        Name = "YONG",
                        LogoImageUrl = "yong.jpg",
                        BrandColor = "#E4322C"
                    },
                    new AgencyCompany {
                        Name = "@Realty",
                        LogoImageUrl = "realty.jpg",
                        BrandColor = "#1F1F1F"
                    }
                };

                _context.AddRange(agencyCompanies);
                _context.SaveChanges();
                return agencyCompanies;
            }
            else {
                return agencyCompanies = _context.agency_companies.ToList();
            }
            
        }

        internal List<Agency> CreateAgenciesForCode(PostCode code)
        {

            var agencyOfficeList = new List<Agency>();

            var agencies = _context.agencies.Include(x=>x.Agents).Where(x => x.PostCode == code.Code).ToList();
            // perform check to see if we already have agencies created for this post code
            if (!agencies.Any())
            {
                foreach (var agencyComp in agencyCompanies)
                {
                    agencyOfficeList.Add(new Agency
                    {
                        AgencyCompany = agencyCompanies.Where(x => x.Name == agencyComp.Name).Single(),
                        AgencyCompanyName = agencyComp.Name,
                        AgencyOfficeName = agencyComp.Name + " " + ToTitleCase(code.Locality),
                        PostCode = code.Code,
                        Locality = code.Locality,
                        Agents = GenerateAgents(agencyComp.Name),
                        LogoImageUrl = agencyComp.LogoImageUrl
                        
                    });
                };
                _context.AddRange(agencyOfficeList);
                _context.SaveChanges();
                return agencyOfficeList;
            }
            else {
                //var agencyxList = _context.Agencies.Include(x => x.Agents).ToList();
                return agencies;
            }

        }

        private List<Agent> GenerateAgents(string companyName)
        {
            var agents = new List<Agent>();
            int count = 1;

            // generate 1 Agents
            for (int i = 0; i < count; i++)
            {
                string firstName = GenRandomItems(firstNames);
                string lastName = GenRandomItems(lastNames);
                string mobilePhone = GenRandomItems(mobilePhones);
                agents.Add(new Agent
                {
                    
                    //FirstName = firstName,
                    //LastName = lastName,
                    //MobileNumber = mobilePhone,
                    //EmailAddress = firstName + "." + lastName + "@" + companyName + ".com.au"
                });
            }

            return agents;
        }

        private string GenRandomItems(List<string> items)
        {
            int index = random.Next(items.Count);
            return items[index];
        }

        private string ToTitleCase(string str)
        {
            return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(str.ToLower());
        }


    }
}
