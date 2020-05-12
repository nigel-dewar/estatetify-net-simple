using Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace EFLinq.Repository
{
    public interface IEFLinqRepository
    {
        Task<PropertiesReturnDTO> FindProperties(string mode, int? page, string suburbs, string propertyTypes, string features, int? minPrice, int? maxPrice, string bedRooms, string bathRooms, string parking);
        Task<IEnumerable<PostCodeModel>> GetPostCodes(string q);
        Task<IEnumerable<PostCodeModel>> GetPostCodesBySlug(string q);
        Task<PropertyListViewModel> GetProperty(string slug);
        Task<string> GetPropertyDesc(string slug);
        // Task<List<ImageDTO>> GetPropertyImages(string propertyId);
        Task<FiltersListViewModel> GetLookupFilters();
        Task<ListingDTO> CreateListing(CreateListingInDTO listingIn);
        

        //Task<PropertyListViewModel> GetPropertyById(string id);
    }
}