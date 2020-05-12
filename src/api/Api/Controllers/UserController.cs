using System;
using System.Threading.Tasks;
using Application.Handlers.Users;
using Application.Models;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
        
        [HttpPost("AddImage")]
        public async Task<ActionResult<Image>> AddImage([FromForm] IFormFile file)
        {
            return await Mediator.Send(new AddImage.Command { File = file});
        }
        
        [HttpPost("SetMain/{id}")]
        public async Task<ActionResult<Unit>> SetMain(Guid id)
        {
            return await Mediator.Send(new SetMainImage.Command { Id = id});
        }
        
        [HttpDelete("DeleteImage/{id}")]
        public async Task<ActionResult<Unit>> DeleteImage(Guid id)
        {
            return await Mediator.Send(new DeleteImage.Command { Id = id});
        }


    }
}