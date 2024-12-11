using AutoMapper;
using PIMS.WebAPI.Models.Domain;
using PIMS.WebAPI.Models.Dto;

namespace PIMS.WebAPI.Mapping
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        { 
            CreateMap<Product, AddProductRequestDto>().ReverseMap();
            CreateMap<Product, UpdateProductRequestDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}
