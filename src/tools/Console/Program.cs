
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using properties.api.Data;
using properties.api.Data.Entities;
using properties.api.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Console
{
    class Program
    {
       
        public IConfiguration Configuration { get; }

        public Program(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private static PropertiesRepository _repo;
        private static ListingsDbContext _dbcontext;
        


        static void Main(string[] args)
        {

            var services = new ServiceCollection();

   
            services.AddDbContext<ListingsDbContext>(options =>
            

            options.UseSqlServer("Server=localhost;Database=properties-api;Trusted_Connection=True;"));

            services.AddScoped<IPropertiesRepository, PropertiesRepository>();
            var serviceProvider = services.BuildServiceProvider();

            _dbcontext = serviceProvider.GetService<ListingsDbContext>();
            _repo = new PropertiesRepository(_dbcontext);

            // run this to import post codes
            if (!_dbcontext.PostCodes.Any()) {
                ImportPostCodes();
            }



            //var properties = _dbcontext.Properties.ToList();
            //if (properties.Any())
            //{
            //    System.Console.WriteLine("Removing Properties");
            //    _dbcontext.Properties.RemoveRange(_dbcontext.Properties);
            //    _dbcontext.SaveChanges();
            //}

            //var agents = _dbcontext.Agents.ToList();
            //if (agents.Any())
            //{
            //    System.Console.WriteLine("Removing Agents");
            //    _dbcontext.Agents.RemoveRange(_dbcontext.Agents);
            //    _dbcontext.SaveChanges();
            //}

            //var agencies = _dbcontext.Agencies.ToList();
            //if (agencies.Any())
            //{
            //    System.Console.WriteLine("Removing Agencies");
            //    _dbcontext.Agencies.RemoveRange(_dbcontext.Agencies);
            //    _dbcontext.SaveChanges();
            //}

            PropertyGen propertyGen = new PropertyGen(_dbcontext);
            propertyGen.GenerateProperties();

        }

        static void ImportPostCodes()
        {
            using (var reader = new StreamReader(@"C:\temp\australian_postcodes.csv"))
            {
                List<string> Code = new List<string>();
                List<string> Locality = new List<string>();
                List<string> State = new List<string>();
                List<string> Long = new List<string>();
                List<string> Lat = new List<string>();
                List<string> Id = new List<string>();
                List<string> DeliveryCentre = new List<string>();
                List<string> Type = new List<string>();
                List<string> Status = new List<string>();

                List<PostCode> PostCodes = new List<PostCode>();

                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();
                    var values = line.Split(',');

                    string x = values[0];

                    string sub = values[1].ToLower().Replace(" ", "-") + "-" + values[0];

                    if (x != "postcode") {
                        PostCodes.Add(new PostCode
                        {
                            Code = int.Parse(values[0]),
                            Locality = values[1],
                            State = values[2],
                            Long = values[3],
                            Lat = values[4],
                            //Id = int.Parse(values[5].ToString()),
                            DeliveryCentre = values[6],
                            Type = values[7],
                            Status = values[8],
                            Suburb = sub });
                    }

                    

                    //Code.Add(values[0]);
                    //Locality.Add(values[1]);
                }

                var codesToAdd = PostCodes.OrderBy(x => x.Code).ToList();

                _dbcontext.PostCodes.AddRange(codesToAdd);

                _dbcontext.SaveChanges();

            }
        }

    }
}
