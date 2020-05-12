using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Application.Handlers.Properties;
using Application.Models;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Application.Models.Properties;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PropertiesController : BaseController
    {

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<PropertyDto>>> List() {
            return await Mediator.Send(new List.Query());
        }

        [AllowAnonymous]
        [HttpGet("find")]
        public async Task<ActionResult<PropertiesFindDto>> Find(string mode, int? page, string suburbs, string propertyTypes, string features, int? minPrice, int? maxPrice, string bedRooms, string bathRooms, string parking)
        {
            return await Mediator.Send(new Find.Query {Mode = mode, Page = page, Suburbs = suburbs, PropertyTypes = propertyTypes, Features = features, MinPrice = minPrice, MaxPrice = maxPrice, BedRooms = bedRooms, BathRooms = bathRooms, Parking = parking });
        }

        [AllowAnonymous]
        [HttpGet("slug/{slug}")]
        public async Task<ActionResult<PropertyDto>> Slug(string slug)
        {
            return await Mediator.Send(new Slug.Query { Slug = slug });
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyDto>> Details(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            try
            {
                var result = await Mediator.Send(command);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(string id, Edit.Command command)
        {
            try
            {
                command.Id = id;
                var result = await Mediator.Send(command);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command { Id = id});
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(string id)
        {
            return await Mediator.Send(new Attend.Command {Id = id});
        }
        
        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> UnAttend(string id)
        {
            return await Mediator.Send(new UnAttend.Command {Id = id});
        }
        
        [HttpPost("{id}/addImage")]
        public async Task<ActionResult<Image>> AddImage([FromForm] IFormFile file, string id)
        {
            return await Mediator.Send(new AddImage.Command { File = file, Id = id});
        }
        
        [HttpPost("{id}/addActivity")]
        public async Task<ActionResult<Unit>> AddActivity(string id, AddActivity.Command command)
        {
            try
            {
                command.Id = id;
                var result = await Mediator.Send(command);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

    }
}
