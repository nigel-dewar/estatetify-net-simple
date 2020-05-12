
using Application.Models;
using Application.Models.Properties;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Application.Interfaces
{
    public interface IPropertiesRepository
    {
        Task<PropertiesFindDto> FindProperties(string mode, int? page, string suburbs, string propertyTypes, string features, int? minPrice, int? maxPrice, string bedRooms, string bathRooms, string parking);
        Task<PropertyDto> GetPropertyBySlug(string slug);
        Task<string> GetPropertyDesc(string slug);
        Task<FiltersListViewModel> GetLookupFilters();
        Task<ListingDto> CreateListing(CreateListingInDTO listingIn);
    }
}