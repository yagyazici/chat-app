using AutoMapper;
using Domain.Dtos;
using Domain.Entities;

namespace Domain.AutoMapper;

public class AutoMapperProfile: Profile
{
    public AutoMapperProfile(){
        CreateMap<User, UserDto>().ReverseMap();
    }    
}