using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using properties.api.Data;
using properties.api.Data.Entities;

namespace Console.Functions
{
    public class Properties
    {
        private ListingsDbContext _context;

        Random random = new Random();

        List<string> streets;
        List<PropertyType> propertyTypes;
        List<Agency> agencies;
        List<string> bigImages;
        List<string> thumbnails;
        List<string> thumbnalimages;
        

        public Properties(ListingsDbContext context)
        {
            _context = context;
        }

        public void Setup() {
            AddPropertyTypes(_context);
            SetupLookupData();
        }

        
        

        internal void CreatePropertiesForCode(PostCode code, List<Agency> agencies)
        {

            var props = _context.Properties.Where(x => x.Suburb == code.Locality).ToList();

            if (!props.Any())
            {
                System.Console.WriteLine("Creating properties for suburb " + code.Locality + " in PostCode: " + code.Code);
                this.agencies = agencies;
                try
                {
                    List<Property> properties = new List<Property>();

                    int count = 3;
                    int streetNumber = 5;
                    for (int i = 0; i < count; i++)
                    {

                        var property = GenerateProperty(code, streetNumber);
                        var images = GenImages(property.Id);
                        property.Images.AddRange(images);
                        properties.Add(property);
                        //if (!property.Listings.Any(x=>x.)) {
                        //    throw new Exception("we cant run here");
                        //}
                        //System.Console.WriteLine("Created Property: " + property.Slug);

                        streetNumber = streetNumber + 3;
                        //properties.Add(property);
                        //i++;

                    }
                    _context.AddRange(properties);
                    _context.SaveChanges();

                }
                catch (Exception ex)
                {
                    var error = ex.Message;
                    throw ex;

                }
            }
            else {
                System.Console.WriteLine("Properties for " + code.Locality + " aleady exist..." );
            }
            
            
        }


        private Property GenerateProperty(PostCode code, int streetNumber)
        {
            //var number = GetRandomStreetNumber(index);
            try
            {
                var id = Guid.NewGuid();
                var number = streetNumber;
                var street = GetRandomStreet();
                var price = GenRandomNumber(150000, 10000000);
                var pricePerWeek = GenRandomNumber(300, 1000);
                var bathrooms = GenRandomNumber(0, 10);
                var bedrooms = GenRandomNumber(1, 10);
                var carSpaces = GenRandomNumber(0, 10);
                var landSize = GenRandomNumber(100, 1000);
                var thumbnail = GenThumbnail();
                var propertyType = GenPropertyType();
                var longDescription = GenLongLoremIpsum();
                

                var streetSluggified = street.ToLower().Replace(" ", "-");
                var suburbSluggified = code.Locality.ToLower().Replace(" ", "-");

                //var listings = GenListings(id, code.Code);

                string fullStreetName = String.Format("{0} {1}", number.ToString(), street);
                string slug = String.Format("{0}-{1}-{2}-{3}", number.ToString(), streetSluggified, suburbSluggified, code.Code);

                var type = GenListingType();
                var listing = GenListing(code.Code, type);

                if (listing == null) {
                    System.Console.WriteLine("Im empty - why?");
                }

                var prop = new Property();

                prop.Id = id;
                prop.Name = fullStreetName;
                prop.Slug = slug;
                prop.PostCode = code.Code;
                prop.State = code.State;
                prop.Suburb = code.Locality;
                prop.SuburbSlug = code.Suburb;

                if (type == "Rent") {
                    prop.BuyPrice = 0;
                    prop.RentPrice = listing.Price;
                    prop.IsForRent = true;
                    prop.IsForSale = false;
                } else if (type == "Buy") {
                    prop.BuyPrice = listing.Price;
                    prop.RentPrice = 0;
                    prop.IsForRent = false;
                    prop.IsForSale = true;
                }

                prop.PropertyType = propertyType;
                prop.ShortDescription = "A pretty good place to live";
                prop.Description = longDescription;
                prop.AvailableDate = listing.DateListingExpires;
                prop.Bathrooms = bathrooms;
                prop.Bedrooms = bedrooms;
                prop.ParkingSpaces = carSpaces;
                prop.LandSize = landSize;
                prop.Thumbnail = thumbnail;
                prop.MainImage = thumbnail;
                prop.IsActive = true;
                prop.IsForAuction = false;
                prop.Listings.Add(listing);

                return prop;
            }
            catch (Exception ex)
            {
                var error = ex.Message;
                throw ex;
            }

        }

        private string GenLongLoremIpsum()
        {
            string lorem = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus vitae congue mauris rhoncus.Sed elementum tempus egestas sed sed risus pretium. Faucibus in ornare quam viverra orci. A iaculis at erat pellentesque adipiscing commodo elit at.Nisi vitae suscipit tellus mauris a diam maecenas sed.Lorem mollis aliquam ut porttitor leo a diam. Odio tempor orci dapibus ultrices.Eget est lorem ipsum dolor sit. Pharetra convallis posuere morbi leo urna. Ullamcorper malesuada proin libero nunc.Etiam tempor orci eu lobortis elementum nibh tellus. Et molestie ac feugiat sed. </p>" +
            "<br>" +
            "<p>Libero volutpat sed cras ornare arcu dui vivamus arcu felis. Eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Nibh tortor id aliquet lectus proin nibh nisl condimentum id. Nunc mattis enim ut tellus elementum. Lorem ipsum dolor sit amet consectetur adipiscing.Phasellus egestas tellus rutrum tellus pellentesque. Massa id neque aliquam vestibulum morbi blandit.Lectus sit amet est placerat in egestas erat imperdiet sed. Vitae justo eget magna fermentum iaculis eu non diam.Duis tristique sollicitudin nibh sit amet commodo nulla facilisi.Dolor morbi non arcu risus quis varius.Tincidunt eget nullam non nisi est. Pretium nibh ipsum consequat nisl vel. Interdum varius sit amet mattis vulputate enim.</p>" +
            "<br>" +
            "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada.Non sodales neque sodales ut etiam. Tincidunt arcu non sodales neque sodales ut etiam sit.Congue quisque egestas diam in arcu cursus. Fames ac turpis egestas sed tempus. Venenatis a condimentum vitae sapien pellentesque. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Tortor id aliquet lectus proin.Gravida arcu ac tortor dignissim.Aliquam purus sit amet luctus venenatis lectus.Quis varius quam quisque id diam vel quam elementum pulvinar. Vel fringilla est ullamcorper eget.Faucibus et molestie ac feugiat sed lectus vestibulum. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit duis. Mollis nunc sed id semper risus in hendrerit gravida. Odio tempor orci dapibus ultrices in iaculis nunc sed augue. Nulla malesuada pellentesque elit eget gravida cum sociis natoque.Varius vel pharetra vel turpis.Eget dolor morbi non arcu risus quis varius.</p>" +
            "<br>" +
            "<p>Vivamus arcu felis bibendum ut tristique et.Pharetra massa massa ultricies mi quis. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Velit dignissim sodales ut eu.Pharetra et ultrices neque ornare aenean euismod elementum nisi quis. Id leo in vitae turpis massa sed elementum tempus. Commodo sed egestas egestas fringilla.Pharetra magna ac placerat vestibulum.Morbi tempus iaculis urna id volutpat lacus.Nunc sed augue lacus viverra vitae congue eu consequat ac. Pellentesque id nibh tortor id aliquet lectus proin. Vel elit scelerisque mauris pellentesque.Elementum sagittis vitae et leo.</p>" +
            "<br>" +
            "<p>Consectetur a erat nam at.Sagittis eu volutpat odio facilisis mauris sit amet. At augue eget arcu dictum varius. Facilisis gravida neque convallis a cras semper auctor neque vitae. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices.Scelerisque varius morbi enim nunc.Velit dignissim sodales ut eu sem integer vitae justo.A diam maecenas sed enim ut sem viverra aliquet.Magna fringilla urna porttitor rhoncus dolor purus non enim.Odio ut enim blandit volutpat maecenas volutpat blandit aliquam.Libero nunc consequat interdum varius sit. Mi bibendum neque egestas congue quisque egestas.Amet risus nullam eget felis.Quam id leo in vitae.Morbi tristique senectus et netus et malesuada fames.</p>";

            return lorem;
        }

        private Listing GenListing(int Code, string type)
        {
            try
            {
                decimal price;
                var randomBool = GetRandomBoolean();
                var agency = GenRandomAgency();

                int index = random.Next(agency.Agents.Count);
                var agent = agency.Agents[index];

                if (type == "Rent")
                {
                    price = GenRandomPrice(300, 1000);
                }
                else {
                    price = GenRandomPrice(300000, 10000000);
                }

                Listing listing = new Listing();

                listing.Id = Guid.NewGuid();
                listing.Agency = agency;
                listing.IsListedByAgent = true;
                listing.Agent = agent;
                listing.UserName = agent.FullName;
                listing.ListingType = type;
                listing.IsPremium = randomBool;
                listing.Price = price;
                listing.IsPrivateSeller = false;
                listing.Active = true;

                return listing;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private static bool GetRandomBoolean()
        {
            return new Random().Next(100) % 2 == 0;
        }

        private Agency GenRandomAgency()
        {
            int index = random.Next(agencies.Count);
            return agencies[index];
        }

        private string GenListingType()
        {
            var types = new List<string> { "Rent", "Buy" };
            int index = random.Next(types.Count);
            var type = types[index];

            return type;
        }

        private List<Image> GenImages(Guid propertyId)
        {
            var images = new List<Image>();
            int i = 0;
            bool isMainNail = true;
            foreach (var img in bigImages)
            {
                if (i != 0)
                {
                    isMainNail = false;
                }
                var imagelId = Guid.NewGuid();
                images.Add(new Image
                {
                    Id = imagelId,
                    MainImage = isMainNail,
                    ThumbnailUrl = bigImages[i],
                    ImageUrl = bigImages[i],
                    PropertyId = propertyId
                });

                i++;
            };
            return images;
        }

        

        private PropertyType GenPropertyType()
        {
            int index = random.Next(propertyTypes.Count);
            return propertyTypes[index];
        }

        private string GenThumbnail()
        {
            int index = random.Next(thumbnalimages.Count);
            return thumbnalimages[index];
        }

        static int GenRandomNumber(int min, int max)
        {
            Random random = new Random();
            int value = random.Next(min, max);
            return value;
        }


        private decimal GenRandomPrice(int min, int max)
        {
            decimal price = random.Next(min, max);
            return price;
        }

        private string GetRandomStreet()
        {

            int index = random.Next(streets.Count);
            return streets[index];
        }

        private int GetRandomStreetNumber(int index)
        {
            // creates a number between 0 and 51
            int num = random.Next(300);
            num = num + index;
            return num;
        }

        private void AddPropertyTypes(ListingsDbContext context)
        {
            if (context.PropertyTypes.Any() == false)
            {
                var propertyTypes = new List<string>() { "House", "Appartment", "Unit", "Villa", "Townhouse", "Acerage" };

                propertyTypes.ForEach(c => context.Add(new PropertyType
                {
                    Name = c
                }));

                context.SaveChanges();

            }
            propertyTypes = _context.PropertyTypes.ToList();
        }

        private void SetupLookupData()
        {

            //propertyTypes = new List<PropertyType>()
            //{
            //    new PropertyType{ }

            //};

            streets = new List<string>(){
                "Wealth St",
                "Lindstrom Court",
                "Marika Street",
                "Pear Street",
                "Corella Place",
                "Murrumba Street",
                "Springsure Street",
                "Hill Road",
                "Gumtree Street",
                "Dilligent Place",
                "Nemies Road",
                "Maynard Place",
                "Robinson Cresent",
                "Hillview Street",
                "Persee Road",
                "Hill Road",
                "Penarth Street",
                "Vinca Street",
                "Mango Road"
            };

            thumbnalimages = new List<string>()
            {
                "https://images.pexels.com/photos/2287310/pexels-photo-2287310.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/259957/pexels-photo-259957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "https://images.pexels.com/photos/2155202/pexels-photo-2155202.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940",
                "https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "https://images.pexels.com/photos/463996/pexels-photo-463996.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940"

            };

            bigImages = new List<string>()
            {
                "https://rimh2.domainstatic.com.au/UOX-jf0pOtItxl9oEeKv-ktBI3Q=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_4_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/uzQ71vAV8Hj7WM9luY7tTVvNXJg=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_8_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/HpQXQpxwZyYgvegc2H223Rsjsws=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_1_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/gtfjo2YWnKdD-swrsXix9NF9X5I=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_5_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/3AU3-7Lg9nDHQHUWNOp4wK9Zm-k=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_6_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/yJjSCLfe8W987TRUPsUQ4qtfvLA=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_7_1_190618_022856-w600-h900",
                "https://rimh2.domainstatic.com.au/6MJeihA4UuqCXeHRDJ8nrUfG8eE=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_9_1_190618_022856-w675-h900",
                "https://rimh2.domainstatic.com.au/nyQ8bweMp0Mvo4CS9mJInBpruBk=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_10_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/5J27PrcdiZndLg-iltXd2bGCfB0=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_11_1_190618_022856-w675-h900",
                "https://rimh2.domainstatic.com.au/Np5lKAZuP_c1uZOLosjwUd0vm94=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/http://b.domainstatic.com.au.s3-website-ap-southeast-2.amazonaws.com/2015379545_12_1_190618_022856-w1200-h800"
            };

            thumbnails = new List<string>()
            {
                "https://rimh2.domainstatic.com.au/ie3gSxtkyOCWgfQ48LSp365bNQ4=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_24_3_190618_022856-w1200-h1200",
                "https://rimh2.domainstatic.com.au/N1NTX6sbNYUIfg00Bc1BD5w_aWg=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_8_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/1oH8kF8Rd2L2SX0gddSVV1ifM0U=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_3_1_190618_022856-w900-h900",
                "https://rimh2.domainstatic.com.au/_7fsNGiPQeE_q9WxoQiwe10-Ono=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_2_1_190630_114318-w1200-h800",
                "https://rimh2.domainstatic.com.au/ZJe4D4sZ1XtL_97Ds4I98TPfByc=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_4_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/STizeJ0ALYXIfpYwneAczd9Nq1w=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_1_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/giYWOY-wJoJJyOyD4hVtlRnz6ls=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_5_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/eWJT1Mth1Kvr7IgU0OVey3Ql25M=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_6_1_190618_022856-w1200-h800",
                "https://rimh2.domainstatic.com.au/k39wd5V9LmcpT0-BJCsTxGNdpG4=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_9_1_190618_022856-w675-h900",
                "https://rimh2.domainstatic.com.au/eKbXQ7yzASkX5x9jnVj4xF1Bkjc=/fit-in/144x106/filters:format(jpeg):quality(80):no_upscale()/2015379545_10_1_190618_022856-w1200-h800"
            };
        }


    }
}
