

using DataAccess;
using Domain.Entities;
using EFLinq.Repository;
using Generator.Seed;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Console
{
    class Program
    {

        private static EFLinqRepository _repo;
        private static ApplicationDbContext _dbcontext;
        //IConfiguration config;

        static void Main(string[] args)
        {


            System.Console.WriteLine(args);

            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .AddEnvironmentVariables()
                .Build();

            string connectionString = "";

            if (args.Length > 0)
            {
                if (args[0] == "local-dev")
                {
                    connectionString = config.GetSection("ConnectionStrings:DefaultConnection").Value;
                }
                else if (args[0] == "ef-dev")
                {
                    connectionString = config.GetSection("ConnectionStrings:MigrationsConnection").Value;
                }
                else
                {
                    // assuming running against local-dev
                    connectionString = config.GetSection("ConnectionStrings:MigrationsConnection").Value;
                }

            }
         

            var services = new ServiceCollection();


            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(connectionString));

            services.AddScoped<IEFLinqRepository, EFLinqRepository>();
            var serviceProvider = services.BuildServiceProvider();

            _dbcontext = serviceProvider.GetService<ApplicationDbContext>();
            //_repo = new EFLinqRepository(_dbcontext);


            var lightSeeder = new LightSeed(_dbcontext);
            lightSeeder.Run();

            // run this to import post codes

            //ImportPostCodes();


            //var properties = _dbcontext.property.ToList();
            //if (properties.Any())
            //{
            //    System.Console.WriteLine("Removing Properties");
            //    _dbcontext.property.RemoveRange(_dbcontext.property);
            //    _dbcontext.SaveChanges();
            //}

            //var agents = _dbcontext.agent.ToList();
            //if (agents.Any())
            //{
            //    System.Console.WriteLine("Removing Agents");
            //    _dbcontext.agent.RemoveRange(_dbcontext.agent);
            //    _dbcontext.SaveChanges();
            //}

            //var agencies = _dbcontext.agency.ToList();
            //if (agencies.Any())
            //{
            //    System.Console.WriteLine("Removing Agencies");
            //    _dbcontext.agency.RemoveRange(_dbcontext.agency);
            //    _dbcontext.SaveChanges();
            //}

            //PropertyGen propertyGen = new PropertyGen(_dbcontext);
            //propertyGen.GenerateProperties();

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
                            Code = values[0],
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

                _dbcontext.postcodes.AddRange(codesToAdd);

                _dbcontext.SaveChanges();

            }
        }

    }
}
