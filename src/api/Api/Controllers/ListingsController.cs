//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Threading.Tasks;
//using Api.Services;
//using Application.Interfaces;
//using Domain;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Persistence;


//namespace Api.Controllers
//{
//    [Route("api/listings")]
//    [ApiController]
//    [Authorize]
//    public class ListingsController : ControllerBase
//    {
//        private readonly IPropertiesRepository _repo;
//        private readonly IUserInfoService _userInfoService;
//        private readonly IHttpContextAccessor _httpContextAccessor;
//        private readonly DataContext _context;

//        public ListingsController(IPropertiesRepository repo, IUserInfoService userInfoService, IHttpContextAccessor httpContextAccessor, DataContext dbContext)
//        {
//            _repo = repo;
//            _userInfoService = userInfoService;
//            _httpContextAccessor = httpContextAccessor;
//            _context = dbContext;
//        }

//        [HttpGet]
//        [Route("{listingId}")]
//        public async Task<ActionResult> GetListing([FromRoute] string listingId)
//        {

//            try
//            {

//                var userId = User.Claims.Single(c => c.Type == "sub").Value;

//                var listing = await _context.Listings.Where(x => x.Id == listingId).SingleOrDefaultAsync();

//                return Ok(listing);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest("Error getting listing" + ex);
//            }

//        }

//        [HttpGet]
//        [Route("property/{propertyId}")]
//        public async Task<ActionResult> GetListingsByPropertyId([FromRoute] string propertyId)
//        {

//            try
//            {

//                var userId = User.Claims.Single(c => c.Type == "sub").Value;

//                var listings = await _context.Listings.Where(x => x.PropertyId == propertyId).ToListAsync();

//                return Ok(listings);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest("Error getting listings for Property" + ex);
//            }

//        }

//        [HttpGet]
//        [Route("managedproperty/{id}")]
//        public async Task<ActionResult> GetManagedProperty(string id)
//        {

//            try
//            {

//                var userId = User.Claims.Single(c => c.Type == "sub").Value;

//                var property = await _context.Properties.Include(x=>x.UserPermissions).Where(x => x.Id == id && x.UserPermissions.Any(y=>y.Value == "WRITE")).SingleOrDefaultAsync();

//                return Ok(property);
//            }
//            catch (Exception ex)
//            {
//                return BadRequest("Error attempting to get managed property for user" + ex);
//            }

//        }

//        [HttpPost]
//        [Route("create")]
//        public async Task<ActionResult> CreateListing([FromBody] ListingInDTO l) 
//        {

//            try
//            {
//                var userId = User.Claims.Single(c => c.Type == "sub").Value;


//                var listingToCreate = new Listing();

//                listingToCreate.PropertyId = l.PropertyId;
//                listingToCreate.Active = l.Active;
//                listingToCreate.Price = l.Price;
//                listingToCreate.ListingType = l.ListingType;
//                listingToCreate.IsPremium = l.IsPremium;
//                listingToCreate.UserId = userId;
//                listingToCreate.UserName = l.UserName;
//                listingToCreate.IsListedByAgent = l.IsListedByAgent;
//                listingToCreate.IsPrivateSeller = l.IsPrivateSeller;
//                listingToCreate.DateListingExpires = DateTimeOffset.Now.AddDays(10);

//                _context.Listings.Add(listingToCreate);
//                var listing = await _context.SaveChangesAsync();

//                var property = await _context.Properties.Where(x => x.Id == listingToCreate.PropertyId).SingleOrDefaultAsync();
//                property.IsActive = true;
                
//                if (listingToCreate.ListingType == "Buy")
//                {
//                    property.IsForSale = true;
//                    property.BuyPrice = listingToCreate.Price;
//                }
//                else {
//                    property.IsForRent = true;
//                    property.RentPrice = listingToCreate.Price;
//                }


//                _context.Update(property);
//                await _context.SaveChangesAsync();
                
//                //var result = await _repo.CreateListing(listingIn);
//                return Ok(listingToCreate);
//            }
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex);
//                return BadRequest("Error attempting to create new Listing");
//                //throw;
//            }
            
//        }

//    }
//}