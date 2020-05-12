using System.Linq;
using Application.Models;
using Application.Models.Properties;
using AutoMapper;
using Domain;

namespace Application.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Property, PropertyDto>();

            CreateMap<Listing, ListingDto>();

            CreateMap<Agent, AgentDto>();

            CreateMap<Agency, AgencyDto>();

            CreateMap<Image, ImageDto>();

            CreateMap<PostCode, PostCodeDto>();


            CreateMap<Activity, ActivityDto>();
            
            CreateMap<UserProperty, AttendeeDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Images.FirstOrDefault(x => x.IsMain).ImageUrl));
            
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Images.FirstOrDefault(x => x.IsMain).ImageUrl));

            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Images.FirstOrDefault(x => x.IsMain).ImageUrl));
        }
    }
}