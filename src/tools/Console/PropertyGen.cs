using Console.Functions;
using properties.api.Data;
using properties.api.Data.Entities;
using properties.api.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Console
{
    public class PropertyGen
    {
        ListingsDbContext _context;
        Random random = new Random();

        List<string> streets;
        List<PropertyType> propertyTypes;
        List<Agency> agencies;
        List<string> bigImages;
        List<string> thumbnails;
        List<string> thumbnalimages;
        List<Property> properties;

        public PropertyGen(ListingsDbContext context)
        {
            _context = context;
        }

        // main function
        public void GenerateProperties() {

            try
            {
                using (_context) {

                    //var allcodes = _context.PostCodes.GroupBy(x => x.Code).Select(y => y.First());
                    var allcodes = _context.PostCodes.ToList();
                    //var codes = _context.PostCodes.Where(x=>x.Locality == "RUNCORN").GroupBy(x => x.Code).Select(y => y.First());
                    var codes = allcodes.Where(x => x.State == "QLD");

                    int totalCount = codes.Count();
                    System.Console.WriteLine("There are " + totalCount + " codes");

                    // load up all lookup data first
                    var lookupsSeeder = new LookupSeeder(_context);
                    lookupsSeeder.Setup();


                    // ensure we have AgencyCompanies already setup
                    var agencyFunction = new Agencies(_context);
                    agencyFunction.GetAgencyCompanies();
                    agencyFunction.Setup();

                    // setup properties
                    var propertyFunction = new Properties(_context);
                    propertyFunction.Setup();

                    int localCode = 0;
                    string localLocality = "";
                    int codeCount = 0;

                    foreach (PostCode code in codes)
                    {
                        // We will only run this block if the code found is unique
                        if (code.Code != localCode)
                        {
                            
                            // this is a new code so we should create some agencies for this code
                            //if (code.State == "QLD") {
                            //    agencies = agencyFunction.CreateAgenciesForCode(code);
                            //    //propertyFunction.CreatePropertiesForCode(code, agencies);
                            //}
                            agencies = agencyFunction.CreateAgenciesForCode(code);
                            //System.Console.WriteLine("properties are getting created for code: " + code.Code + " - current count " + codeCount);
                        }
                        localCode = code.Code;

                        propertyFunction.CreatePropertiesForCode(code, agencies);
                        //System.Console.WriteLine("properties are getting created for code: " + code.Code + " Locale " + code.Locality);

                        int itemsLeft = totalCount - codeCount;
                        System.Console.WriteLine(itemsLeft + " Items left to create");

                        codeCount++;

                        //_context.Dispose();
                        //if (code.Locality != localLocality)
                        //{
                        //    // Ensure we create new properties per locality

                        //}
                        //localLocality = code.Locality;

                    }
                    
                    System.Console.WriteLine("We are done here");
                    System.Console.ReadLine();
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        

    }

    
}
