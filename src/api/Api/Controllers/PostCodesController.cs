using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Handlers.PostCodes;
using Application.Handlers.PostCodes.Queries;
using Application.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class PostCodesController : BaseController
    {


        // when user searches on home page of app, this is the controller end point that is hit.
        // it will do a repository lookup
        [HttpPost("FindByAny")]
        public async Task<ActionResult<List<PostCodeDto>>> FindByAny([FromBody]PostCodeQueryDto model)
        {
            return await Mediator.Send(new PostCodesQueryByAny.Query { SearchQuery = model.Query });
        }

        [HttpPost("FindBySlug")]
        public async Task<ActionResult<List<PostCodeDto>>> FindBySlug([FromBody]PostCodeQueryDto model)
        {
            return await Mediator.Send(new PostCodesQueryBySlug.Query { SearchQuery = model.Query });
        }


    }
}
